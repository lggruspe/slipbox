from glob import iglob
from os.path import dirname, exists, getmtime, isfile, join, pardir
from os import remove, utime
import sqlite3
import subprocess as sp
import sys
import threading
import time

from zettel import client, server
from zettel.config import Config
from zettel.pandoc.commands import scan_metadata

def touch_with_backlinks(notes, conn):
    """Touch files with backlink to notes."""
    sql = "SELECT dest FROM links WHERE src = :src AND description != ''"
    cur = conn.cursor()
    for note in notes:
        for row in cur.execute(sql, {"src": note}):
            utime(row[0])

def touch_from_outlines(notes, conn):
    """Touch notes with modified sequence/folgezettel sections."""
    sql = "SELECT note FROM folgezettels WHERE outline = :outline"
    cur = conn.cursor()
    for note in notes:
        for row in cur.execute(sql, {"outline": note}):
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
            src TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            dest TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            description TEXT,
            PRIMARY KEY (src, dest)
        );

        CREATE TABLE keywords (
            note TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            keyword TEXT,
            PRIMARY KEY (note, keyword)
        );

        CREATE TABLE sequences (
            prev TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            next TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            outline TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            PRIMARY KEY (prev, next, outline)
        );

        CREATE TABLE folgezettels (
            outline TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            note TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            seqnum TEXT NOT NULL,
            PRIMARY KEY (outline, seqnum)
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
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=join(dirname(__file__),
                                                         pardir))
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

def scan_zettels(config=Config()):
    last_scan = check_database(config.user.database)
    with sqlite3.connect(config.user.database) as conn:
        delete_missing_notes_from_db(conn)
    all_notes = iglob("**/*.md", recursive=True)
    modified_recently = lambda note: getmtime(note) >= last_scan
    modified_notes = list(filter(modified_recently, all_notes))
    if modified_notes:
        scan_modified(modified_notes, config.host, config.port)
        with sqlite3.connect(config.user.database) as conn:
            touch_with_backlinks(modified_notes, conn)
            touch_from_outlines(modified_notes, conn)
        utime(config.user.database)
