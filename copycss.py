#!/usr/bin/env python3

import glob
from os.path import abspath, dirname, join
import re
import subprocess as sp

def main():
    css = abspath(join(dirname(__file__), "zettel.css"))
    for filename in glob.iglob("**/*.html", recursive=True):
        pardir = re.sub("(.*)/[^/]*.html", r"\1", abspath(filename))
        sp.run(["cp", css, pardir], cwd=dirname(__file__))

if __name__ == "__main__":
    main()
