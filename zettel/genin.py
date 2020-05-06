from dataclasses import asdict
from io import StringIO
from os.path import abspath, curdir, dirname, join, relpath
import re
import sqlite3
import sys
import ninja_syntax as ns

from zettel.config import Config

def generate_ninja(config=Config()):
    w = ns.Writer(StringIO())
    for k, v in asdict(config.user).items():
        w.variable(k, v)
    w.newline()

    w.rule("scan", "$python -m zk scan")
    w.newline()
    w.rule("ninja", "$python -m zk genin > build.ninja", generator=True)
    w.newline()
    w.rule("pandoc", "$pandoc -s $in -o $out $options --bibliography=$bib " +\
           "$filters -Mrelpath=$in -c $css -Mbasedir=$basedir " +\
           "-Mdatabase=$database")
    w.newline()
    w.build("scan", "scan")
    w.newline()
    w.build("ninja", "ninja", order_only=["scan"])
    w.newline()

    with sqlite3.connect(config.user.database) as conn:
        cur = conn.cursor()
        for row in cur.execute("SELECT filename FROM notes"):
            note = row[0]
            shadow = {"css": relpath(config.user.css, dirname(note))}
            html = re.sub(".md$", ".html", note)
            w.build(html, "pandoc", inputs=[note], order_only=["ninja"],
                    variables=shadow)
            w.newline()

    print(w.output.getvalue())
    w.output.close()
