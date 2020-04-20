#!/usr/bin/env python3

import os.path
import sqlite3

from zettel.config import Config

def get_notes():
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute("SELECT filename FROM notes")
        notes = cur.fetchall()
    return (note[0] for note in notes)

def sqlite_string(s):
    t = s.replace("'", "''")
    return f"'{t}'"

def main():
    missing = filter(lambda note: not os.path.exists(note), get_notes())
    args = ", ".join(map(sqlite_string, missing))
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute(f"DELETE FROM notes WHERE filename IN ({args})")

if __name__ == "__main__":
    main()
