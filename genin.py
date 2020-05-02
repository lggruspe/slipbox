from io import StringIO
from os.path import abspath, curdir, dirname, join, relpath
import re
import sqlite3
import sys
import ninja_syntax as ns

zettel_css = abspath("zettel.css")
zettel_bib_note = abspath("sources.markdown")
zettel_bib_html = re.sub(".markdown$", ".html", zettel_bib_note)
zettel_filter = abspath(join(dirname(__file__), "filters", "zettel-compile.lua"))
basedir = abspath(curdir)

def main():
    try:
        db = sys.argv[1]
    except IndexError:
        print("Usage: python3 -m genin (sqlite3 database)", file=sys.stderr)
        return

    w = ns.Writer(StringIO())
    variables = {
        "pandoc": "pandoc",
        "python": "python3",
        "zettel_bib": "zettel.bib",
        "zettel_css": zettel_css,
        "zettel_db": "zettel.db.sqlite3",
        "zettel_bib_note": zettel_bib_html,
        "zettel_filter": zettel_filter,
        "options": "--mathjax --strip-comments ",
        "basedir": basedir,
        "bibliography": "--bibliography=$zettel_bib",
        "filters": "--lua-filter=$zettel_filter -Fpandoc-citeproc",
        "metadata": "-Mlink-citations=true",
        "zettel_args": "-Mbasedir=$basedir -Mdatabase=$zettel_db",
    }
    for k, v in variables.items():
        w.variable(k, v)
    w.newline()

    w.rule("scan", "$python -m scan")
    w.newline()

    w.build(None, "scan", implicit_outputs=["$zettel_db"])
    w.newline()

    w.rule("pandoc", "$pandoc -s $in -o $out $options $bibliography $filters $metadata -Mrelpath=$in -c $zettel_css $zettel_args -Mbibliography-zettel=$zettel_bib_note")
    w.newline()

    with sqlite3.connect(db) as conn:
        cur = conn.cursor()
        for row in cur.execute("SELECT filename FROM notes"):
            note = row[0]
            shadow = {
                "zettel_css": relpath(zettel_css, dirname(note)),
                "zettel_bib_note": relpath(zettel_bib_html, dirname(note)),
            }
            html = re.sub(".md$", ".html", note)
            w.build(html, "pandoc", inputs=[note], order_only=["$zettel_db"], variables=shadow)
            w.newline()

    w.build(zettel_bib_html, "pandoc", inputs=[zettel_bib_note], order_only=["$zettel_db"], variables={
        "zettel_css": relpath(zettel_css, dirname(zettel_bib_note)),
        "metadata": "",
    })

    print(w.output.getvalue())
    w.output.close()

if __name__ == "__main__":
    main()
