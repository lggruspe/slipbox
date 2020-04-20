#!/usr/bin/env python3

import argparse
import glob
import os.path
import sqlite3
import subprocess as sp
import sys
import threading
import time

from zettel import client, server
from zettel.config import Config
from zettel.init import init
from zettel.missing import delete_missing_notes_from_database
from zettel.pandoc.commands import scan_metadata

def get_options():
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=5000, help="port number")
    args = parser.parse_args()
    return args

def get_last_scan():
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute("SELECT value FROM meta WHERE key = 'last_scan'")
        last_scan = int(cur.fetchone()[0])
    return last_scan

def update_last_scan():
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO meta (key, value)
                VALUES ('last_scan', :last_scan)
                    ON CONFLICT (key) DO UPDATE SET value = :last_scan
        """, {"last_scan": time.time()})
        conn.commit()

def notes_modified_recently(last_scan=None):
    if last_scan is None:
        last_scan = get_last_scan()
    for note in glob.iglob("**/*.md", recursive=True):
        mtime = os.path.getmtime(note)
        if mtime >= last_scan:
            yield note

def check_database():
    if not os.path.isfile(Config.database):
        init()

def main():
    check_database()
    args = get_options()
    host = "localhost"
    port = args.port

    delete_missing_notes_from_database()

    notes = list(notes_modified_recently())
    if not notes:
        return

    threading.Thread(target=server.main, args=(host, port)).start()

    tasks = []
    for note in notes:
        cmd = scan_metadata(note, port)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=os.path.dirname(__file__))
        tasks.append(task)
    for task in tasks:
        task.wait()
    client.shutdown(host, port)
    update_last_scan()

if __name__ == "__main__":
    main()
