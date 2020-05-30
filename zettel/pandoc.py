import os.path
import re

def metadata(**kwargs):
    return ' '.join(f"-M {k}:{v}" for k, v in kwargs.items())

def lua_filter(*args):
    return ' '.join(f"--lua-filter=filters/{x}" for x in args)

def pandoc_filter(*args):
    return ' '.join(f"--filter={x}" for x in args)

def pandoc(*args):
    cmd = ["pandoc"]
    for arg in args:
        cmd.extend(arg.split(' '))
    return cmd

BASEDIR = os.path.abspath(os.path.curdir)

def scan_metadata(note, port):
    meta = metadata(basedir=BASEDIR, relpath=note, port=port)
    filters = lua_filter("zettel-scan.lua")
    filename = os.path.join(BASEDIR, note)
    return pandoc(meta, filters, filename)
