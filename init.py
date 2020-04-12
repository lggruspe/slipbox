#!/usr/bin/env python3

import os
import sqlite3

from zettel.config import Config

def init():
    try:
        os.remove(Config.database)
    except FileNotFoundError:
        pass
    conn = sqlite3.connect(Config.database)
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys = ON")
    cur.execute("""
        CREATE TABLE notes(
            filename TEXT PRIMARY KEY,
            title TEXT
        );
    """)

    cur.execute("""
        CREATE TABLE links(
            src TEXT,
            dest TEXT,
            description TEXT,
            relative_link TEXT,
            relative_backlink TEXT,
            original_link TEXT,
            FOREIGN KEY (src) REFERENCES notes(filename),
            FOREIGN KEY (dest) REFERENCES notes(filename),
            PRIMARY KEY (src, dest)
        );
    """)

    cur.execute("""
        CREATE TABLE keywords(
            note TEXT,
            keyword TEXT,
            FOREIGN KEY (note) REFERENCES notes(filename),
            PRIMARY KEY (note, keyword)
        );
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init()
