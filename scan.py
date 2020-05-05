from glob import iglob
from os.path import dirname, exists, getmtime, isfile
from os import remove, utime
import sqlite3
import subprocess as sp
import sys
import threading
import time

from zettel import client, server
from zettel.config import Config
from zettel.pandoc.commands import scan_metadata

def argparser(config=Config()):
    from argparse import ArgumentParser
    description = "Scan zettels that have been modified."
    parser = ArgumentParser(prog="scan", description=description)
    parser.add_argument("-H", "--host", type=str, default=config.host,
                        help=f"host address (default={config.host!r})")
    parser.add_argument("-p", "--port", type=int, default=config.port,
                        help=f"port number (default={config.port!r})")
    return parser

def get_options(config=Config()):
    parser = argparser(config)
    parser.parse_args(namespace=config)
    return config

def touch_modified(notes, conn):
    """Touch notes and links from notes."""
    sql = "SELECT dest FROM links WHERE src = :src"
    cur = conn.cursor()
    for note in notes:
        utime(note)
        for row in cur.execute(sql, {"src": note}):
            utime(row[0])

def initialize_db(db):
    """Initialize sqlite file (db)."""
    try:
        remove(db)
    except FileNotFoundError:
        pass
    conn = sqlite3.connect(db)
    cur = conn.cursor()
    cur.executescript("""
        PRAGMA foreign_keys = ON;

        CREATE TABLE notes (
            filename TEXT PRIMARY KEY,
            title TEXT
        );

        CREATE TABLE links (
            src TEXT,
            dest TEXT,
            description TEXT,
            relative_backlink TEXT,
            FOREIGN KEY (src) REFERENCES notes(filename) ON DELETE CASCADE,
            FOREIGN KEY (dest) REFERENCES notes(filename) ON DELETE CASCADE,
            PRIMARY KEY (src, dest)
        );

        CREATE TABLE keywords (
            note TEXT,
            keyword TEXT,
            FOREIGN KEY (note) REFERENCES notes(filename) ON DELETE CASCADE,
            PRIMARY KEY (note, keyword)
        );
    """)
    conn.commit()
    conn.close()

def check_database(db):
    """Initialize database if it does not exist.

    Return modification time (or 0 if it has never been modified).
    """
    if isfile(db):
        return getmtime(db)
    # TODO what if path exists but is a directory?
    initialize_db(db)
    return 0

def scan_modified(notes, host, port):
    threading.Thread(target=server.main, args=(host, port)).start()
    tasks = []
    for note in notes:
        cmd = scan_metadata(note, port)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=dirname(__file__))
        tasks.append(task)
    for task in tasks:
        task.wait()
    client.shutdown(host, port)

def sqlite_string(s):
    t = s.replace("'", "''")
    return f"'{t}'"

def delete_missing_notes_from_db(conn):
    cur = conn.cursor()
    notes = (note[0] for note in cur.execute("SELECT filename FROM notes"))
    missing = filter(lambda note: not exists(note), notes)
    args = ", ".join(map(sqlite_string, missing))
    cur.execute(f"DELETE FROM notes WHERE filename IN ({args})")

def main(config=Config()):
    last_scan = check_database(config.user.database)
    with sqlite3.connect(config.user.database) as conn:
        delete_missing_notes_from_db(conn)
    all_notes = iglob("**/*.md", recursive=True)
    modified_recently = lambda note: getmtime(note) >= last_scan
    modified_notes = list(filter(modified_recently, all_notes))
    if modified_notes:
        scan_modified(modified_notes, config.host, config.port)
        with sqlite3.connect(config.user.database) as conn:
            touch_modified(modified_notes, conn)
        utime(config.user.database)

if __name__ == "__main__":
    main(get_options())
