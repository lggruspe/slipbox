#!/usr/bin/env python3

import glob
import os
import sqlite3
import subprocess as sp
import sys
import threading

from zettel import client, server
from zettel.config import Config
from zettel.pandoc import *

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
            relative_backlink TEXT,
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

def main():
    host = "localhost"
    port = 5000
    try:
        port = int(sys.argv[1])
    except:
        pass

    threading.Thread(target=server.main, args=(host, port)).start()
    init()

    tasks = []
    for note in glob.iglob("**/*.md", recursive=True):
        basedir = os.path.abspath(os.path.curdir)
        meta = metadata(basedir=basedir, relpath=note, port=port)
        cmd = pandoc(meta, lua_filter("title.lua", "prepare.lua"), os.path.join(basedir, note))
        tasks.append(sp.Popen(cmd, stdout=sp.DEVNULL, cwd=os.path.dirname(__file__)))
    for task in tasks:
        task.wait()
    client.shutdown(host, port)

if __name__ == "__main__":
    main()
