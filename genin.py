from dataclasses import asdict
from io import StringIO
from os.path import abspath, curdir, dirname, join, relpath
import re
import sqlite3
import sys
import ninja_syntax as ns

from zettel.config import Config

def get_options(config=Config()):
    from argparse import ArgumentParser
    description = "Generate ninja file for generating HTML from zettels."
    parser = ArgumentParser(description=description)
    help_msg = "zettel sqlite3 database filename (default={})".format(
        repr(config.user.database)
    )
    parser.add_argument("-d", "--database", type=str,
                        default=config.user.database, help=help_msg)
    parser.parse_args(namespace=config.user)
    return config

def main(config=Config()):
    w = ns.Writer(StringIO())
    for k, v in asdict(config.user).items():
        w.variable(k, v)
    w.newline()

    w.rule("pandoc", "$pandoc -s $in -o $out $options --bibliography=$bib " +\
           "$filters -Mrelpath=$in -c $css -Mbasedir=$basedir " +\
           "-Mdatabase=$database")
    w.newline()

    with sqlite3.connect(config.user.database) as conn:
        cur = conn.cursor()
        for row in cur.execute("SELECT filename FROM notes"):
            note = row[0]
            shadow = {"css": relpath(config.user.css, dirname(note))}
            html = re.sub(".md$", ".html", note)
            w.build(html, "pandoc", inputs=[note], order_only=["$database"],
                    variables=shadow)
            w.newline()

    print(w.output.getvalue())
    w.output.close()

if __name__ == "__main__":
    main(get_options())
