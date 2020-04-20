import os.path
import re

from zettel.pandoc import *

BASEDIR = os.path.abspath(os.path.curdir)

def scan_metadata(note, port):
    meta = metadata(basedir=BASEDIR, relpath=note, port=port)
    filters = lua_filter("zettel-scan.lua")
    filename = os.path.join(BASEDIR, note)
    return pandoc(meta, filters, filename)

def generate_html(note, database):
    meta = metadata(basedir=BASEDIR, relpath=note, database=database)
    filename = os.path.join(BASEDIR, note)
    html = re.sub("(.*).md", r"\1.html", filename)
    lua_filters = lua_filter("zettel-compile.lua")
    filters = pandoc_filter("pandoc-citeproc")
    bib = bibliography(os.path.abspath("zettel.bib"))
    return pandoc("-s -c zettel.css", meta, lua_filters, bib, filters, filename,
        "-o", html)
