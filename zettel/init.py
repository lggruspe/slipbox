#!/usr/bin/env python3

import os
import sqlite3

from .config import Config

def init():
    try:
        os.remove(Config.database)
    except FileNotFoundError:
        pass
    conn = sqlite3.connect(Config.database)
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
