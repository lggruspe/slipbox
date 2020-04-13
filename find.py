#!/usr/bin/env python3

import glob
import os.path
import sqlite3

from zettel.config import Config

def get_last_scan():
    conn = sqlite3.connect(Config.database)
    cur = conn.cursor()
    cur.execute("SELECT value FROM meta WHERE key = 'last_scan'")
    return int(cur.fetchone()[0])

def notes_modified_recently(last_scan):
    for note in glob.iglob("**/*.md", recursive=True):
        mtime = os.path.getmtime(note)
        if mtime >= last_scan:
            yield note

def main():
    for note in notes_modified_recently(get_last_scan()):
        print(note)

if __name__ == "__main__":
    main()
