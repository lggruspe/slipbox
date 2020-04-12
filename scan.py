#!/usr/bin/env python3

import argparse
import os
import sqlite3
import subprocess as sp
import sys
import threading

from zettel import client, server
from zettel.config import Config
from zettel.pandoc.commands import scan_metadata

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

def get_options():
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=5000, help="port number")
    parser.add_argument("note", nargs="*", help="path to note relative to current directory")
    args = parser.parse_args()
    return args

def main():
    args = get_options()
    host = "localhost"
    port = args.port
    notes = args.note

    threading.Thread(target=server.main, args=(host, port)).start()
    init()

    tasks = []
    for note in notes:
        cmd = scan_metadata(note, port)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=os.path.dirname(__file__))
        tasks.append(task)
    for task in tasks:
        task.wait()
    client.shutdown(host, port)

if __name__ == "__main__":
    main()
