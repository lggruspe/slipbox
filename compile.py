#!/usr/bin/env python3

import glob
from os.path import abspath, dirname
import re
import sqlite3
import subprocess as sp

from zettel.config import Config
from zettel.pandoc.commands import generate_html

def outdated_notes():
    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        cur.execute("SELECT filename FROM notes WHERE outdated = 1")
        rows = cur.fetchall()
    return (row[0] for row in rows)

def main():
    tasks = {}
    database = abspath(Config.database)
    for note in outdated_notes():
        cmd = generate_html(note, database)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=dirname(__file__))
        tasks[note] = task
    successes = []
    for note, task in tasks.items():
        status = task.wait()
        if status == 0:
            successes.append(note)

    with sqlite3.connect(Config.database) as conn:
        cur = conn.cursor()
        sql = "UPDATE notes SET outdated = 0 WHERE filename = :note"
        for note in successes:
            cur.execute(sql, {"note": note})

    for filename in glob.iglob("**/*.html", recursive=True):
        pardir = re.sub("(.*)/[^/]*.html", r"\1", abspath(filename))
        sp.run(["cp", "zettel.css", pardir], cwd=dirname(__file__))

if __name__ == "__main__":
    main()
