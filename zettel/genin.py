from dataclasses import asdict
from io import StringIO
from os.path import abspath, curdir, dirname, join, relpath
import re
import sqlite3
import sys
import ninja_syntax as ns

from zettel.config import Config

def get_implicit_dependencies(note, conn):
    sql = """
        SELECT src AS dep FROM links WHERE dest = :note AND description != ''
            UNION
                SELECT outline AS dep FROM folgezettels WHERE note = :note
                    ORDER BY dep
    """
    cur = conn.cursor()
    return [row[0] for row in cur.execute(sql, {"note": note})]

def generate_ninja(config=Config()):
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
            implicit = get_implicit_dependencies(note, conn)
            w.build(html, "pandoc", inputs=[note], implicit=implicit,
                    order_only=["$database"], variables=shadow)
            w.newline()

    print(w.output.getvalue())
    w.output.close()
