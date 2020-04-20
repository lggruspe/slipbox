import os.path
import re

from zettel.pandoc import *

BASEDIR = os.path.abspath(os.path.curdir)

def scan_metadata(note, port):
    meta = metadata(basedir=BASEDIR, relpath=note, port=port)
    filters = lua_filter("zettel-scan.lua")
    filename = os.path.join(BASEDIR, note)
    return pandoc(meta, filters, filename)
