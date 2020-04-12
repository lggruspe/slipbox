#!/usr/bin/env python3

import glob
from os.path import abspath, dirname
import re
import subprocess as sp

from zettel.config import Config
from zettel.pandoc.commands import generate_html

def main():
    tasks = []
    database = abspath(Config.database)
    for note in glob.iglob("**/*.md", recursive=True):
        cmd = generate_html(note, database)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=dirname(__file__))
        tasks.append(task)
    for task in tasks:
        status = task.wait()

    for filename in glob.iglob("**/*.html", recursive=True):
        pardir = re.sub("(.*)/[^/]*.html", r"\1", abspath(filename))
        sp.run(["cp", "basic.css", pardir], cwd=dirname(__file__))

if __name__ == "__main__":
    main()
