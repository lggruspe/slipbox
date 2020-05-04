from argparse import ArgumentParser
from glob import iglob
import os
import sqlite3
import subprocess as sp
import sys
import threading
import time

from zettel import client, server
from zettel.config import Config
from zettel.init import init
from zettel.missing import delete_missing_notes_from_db
from zettel.pandoc.commands import scan_metadata

def get_options():
    description = "Scan zettels that have been modified."
    parser = ArgumentParser(description=description)
    parser.add_argument("-H", "--host", type=str, default="localhost",
                        help="host address (default='localhost')")
    parser.add_argument("-p", "--port", type=int, default=5000,
                        help="port number (default=5000)")
    args = parser.parse_args()
    return args

def touch_modified(notes, conn):
    """Touch notes and links from notes."""
    sql = "SELECT dest FROM links WHERE src = :src"
    cur = conn.cursor()
    for note in notes:
        os.utime(note)
        for row in cur.execute(sql, {"src": note}):
            os.utime(row[0])

def check_database(db):
    """Initialize database if it does not exist.

    Return modification time (or 0 if it has never been modified).
    """
    if os.path.isfile(db):
        return os.path.getmtime(db)
    # TODO what if path exists but is a directory?
    init()
    return 0

def scan_modified(notes, host, port):
    threading.Thread(target=server.main, args=(host, port)).start()
    tasks = []
    for note in notes:
        cmd = scan_metadata(note, port)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=os.path.dirname(__file__))
        tasks.append(task)
    for task in tasks:
        task.wait()
    client.shutdown(host, port)

def main(host="localhost", port=5000):
    last_scan = check_database(Config.database)
    with sqlite3.connect(Config.database) as conn:
        delete_missing_notes_from_db(conn)
    all_notes = iglob("**/*.md", recursive=True)
    modified_recently = lambda note: os.path.getmtime(note) >= last_scan
    modified_notes = list(filter(modified_recently, all_notes))
    if modified_notes:
        scan_modified(modified_notes, host, port)
        with sqlite3.connect(Config.database) as conn:
            touch_modified(modified_notes, conn)
        os.utime(Config.database)

if __name__ == "__main__":
    args = get_options()
    main(host=args.host, port=args.port)
