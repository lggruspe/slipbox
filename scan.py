#!/usr/bin/env python3

import argparse
import os.path
import subprocess as sp
import sys
import threading

from zettel import client, server
from zettel.pandoc.commands import scan_metadata

def get_options():
    parser = argparse.ArgumentParser()
    parser.add_argument("-p", "--port", type=int, default=5000, help="port number")
    parser.add_argument("note", nargs="*", help="path to note relative to current directory")
    args = parser.parse_args()
    return args

def main():
    args = get_options()
    host = "localhost"
    port = args.port
    notes = args.note
    if not notes:
        return

    threading.Thread(target=server.main, args=(host, port)).start()

    tasks = []
    for note in notes:
        cmd = scan_metadata(note, port)
        task = sp.Popen(cmd, stdout=sp.DEVNULL, cwd=os.path.dirname(__file__))
        tasks.append(task)
    for task in tasks:
        task.wait()
    client.shutdown(host, port)

if __name__ == "__main__":
    main()
