#!/usr/bin/env python3

import sqlite3

from zettel.config import Config

def get_notes_to_compile():
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute("SELECT filename FROM notes WHERE outdated = 1")
        rows = cur.fetchall()
    return (row[0] for row in rows)

def main():
    for note in get_notes_to_compile():
        print(note)

if __name__ == "__main__":
    main()
