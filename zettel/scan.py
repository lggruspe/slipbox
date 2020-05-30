from glob import iglob
from os.path import dirname, exists, getmtime, isfile, join, pardir
import sqlite3
import subprocess as sp
import sys
import threading
import time

from . import client, server
from .database import initialize
from .pandoc import scan_metadata

def create_database_once(filename):
    """Create database if it does not exist.

    Return modification time (or 0 if file did not exist)."""
    # TODO what if path exists but is a directory?
    timestamp = getmtime(filename) if isfile(filename) else 0
    if timestamp:
        return timestamp
    with sqlite3.connect(filename) as conn:
        initialize(conn)
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
    cur.executescript("PRAGMA foreign_keys = ON;")
    notes = (note[0] for note in cur.execute("SELECT filename FROM notes"))
    missing = filter(lambda note: not exists(note), notes)
    args = ", ".join(map(sqlite_string, missing))
    cur.execute(f"DELETE FROM notes WHERE filename IN ({args})")

def scan_zettels(database, host, port):
    """Scan zettels that have been modified."""
    last_scan = create_database_once(database)
    with sqlite3.connect(database) as conn:
        delete_missing_notes_from_db(conn)
    all_notes = iglob("**/*.md", recursive=True)
    modified_recently = lambda note: getmtime(note) >= last_scan
    modified_notes = list(filter(modified_recently, all_notes))
    if modified_notes:
        scan_modified(modified_notes, host, port)

def show_missing(database):
    """Show list of notes with no outline."""
    with sqlite3.connect(database) as conn:
        cur = conn.cursor()
        sql = """
            SELECT filename FROM notes WHERE filename NOT IN
                (SELECT note FROM folgezettels)
        """
        for row in cur.execute(sql):
            print(row[0])
