from io import StringIO
from os.path import abspath, curdir, dirname, join, relpath
import re
import sqlite3
import sys
import ninja_syntax as ns

from zettel.config import UserConfig

def get_options(config=UserConfig()):
    from argparse import ArgumentParser
    description = "Generate ninja file for generating HTML from zettels."
    parser = ArgumentParser(description=description)
    help_msg = f"zettel sqlite3 database filename (default={config.database!r})"
    parser.add_argument("-d", "--database", type=str, default=config.database,
                        help=help_msg)
    parser.parse_args(namespace=config)
    return config

def main(config=UserConfig()):
    w = ns.Writer(StringIO())
    variables = {
        "pandoc": config.pandoc,
        "python": config.python,
        "zettel_bib": config.bib,
        "zettel_css": abspath(config.css),
        "zettel_db": config.database,
        "zettel_filter": abspath(join(dirname(__file__), "filters",
                                      "zettel-compile.lua")),
        "options": config.options,
        "basedir": config.basedir,
        "bibliography": "--bibliography=$zettel_bib",
        "filters": "--lua-filter=$zettel_filter -Fpandoc-citeproc",
        "zettel_args": "-Mbasedir=$basedir -Mdatabase=$zettel_db",
    }
    for k, v in variables.items():
        w.variable(k, v)
    w.newline()

    w.rule("scan", "$python -m scan")
    w.newline()

    w.build(None, "scan", implicit_outputs=["$zettel_db"])
    w.newline()

    w.rule("pandoc", "$pandoc -s $in -o $out $options $bibliography $filters" +\
           " -Mrelpath=$in -c $zettel_css $zettel_args")
    w.newline()

    with sqlite3.connect(config.database) as conn:
        cur = conn.cursor()
        for row in cur.execute("SELECT filename FROM notes"):
            note = row[0]
            shadow = {"zettel_css": relpath(abspath(config.css), dirname(note))}
            html = re.sub(".md$", ".html", note)
            w.build(html, "pandoc", inputs=[note], order_only=["$zettel_db"],
                    variables=shadow)
            w.newline()

    print(w.output.getvalue())
    w.output.close()

if __name__ == "__main__":
    main(get_options())
