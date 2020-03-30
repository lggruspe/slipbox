#!/usr/bin/env python3

import glob
from os.path import abspath, dirname
import re
import subprocess as sp

from zettel.config import Config
from zettel.pandoc import *

def main():
    tasks = []
    for note in glob.iglob("**/*.md", recursive=True):
        filename = abspath(note)
        meta = metadata(filename=filename, database=abspath(Config.database))
        html = re.sub("(.*).md", r"\1.html", filename)
        cmd = pandoc("-s -c basic.css", meta,
               lua_filter("back-links.lua", "html-links.lua",
                          "clean-meta.lua", "tags.lua", "filename.lua"),
               filename, "-o", html)
        tasks.append(sp.Popen(cmd, stdout=sp.DEVNULL, cwd=dirname(__file__)))
    for task in tasks:
        status = task.wait()

    for filename in glob.iglob("**/*.html", recursive=True):
        pardir = re.sub("(.*)/[^/]*.html", r"\1", abspath(filename))
        sp.run(["cp", "basic.css", pardir], cwd=dirname(__file__))

if __name__ == "__main__":
    main()
