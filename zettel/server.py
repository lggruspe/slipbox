from dataclasses import dataclass
import json
import socketserver
import sqlite3
import sys
import threading

from .config import UserConfig
from .request import *

class RequestHandler(socketserver.BaseRequestHandler):
    def handle(self):
        data = self.request.recv(1024).decode().strip()
        self.request.sendall(b"ok")
        if data == "shutdown":
            process(self.server.queue)
            threading.Thread(target=self.server.shutdown).start()
        else:
            try:
                req = json.loads(data)
                req_t = req.get("type")
                params = req.get("data")
                if req_t == "note":
                    if params:
                        self.server.queue.notes.append(params)
                elif req_t == "link":
                    if params:
                        self.server.queue.links.append(params)
                elif req_t == "keyword":
                    if params:
                        self.server.queue.keywords.append(params)
                elif req_t == "folgezettel":
                    if params:
                        self.server.queue.folgezettels.append(params)
            except json.decoder.JSONDecodeError:
                pass

@dataclass
class ParamQueue:
    notes = []
    links = []
    keywords = []
    folgezettels = []

class Server(socketserver.TCPServer):
    queue = ParamQueue()

def process(queue):
    conn = sqlite3.connect(UserConfig().database)
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys = ON;")
    for params in queue.notes:
        # delete existing keywords and links in note but don't delete the note
        # itself to keep backlinks
        cur.execute(delete_note_keywords(), {
            "note": params.get("filename")
        })
        cur.execute(delete_note_links(), {
            "src": params.get("filename")
        })
        # delete folgezettel entries taken from outline note before inserting
        # to remove deleted and duplicate entries
        cur.execute(delete_note_folgezettels(), {
            "outline": params.get("filename")
        })
        cur.execute(add_note(), params)
    for params in queue.keywords:
        cur.execute(add_keyword(), params)
    for params in queue.links:
        fixed_params = transform_link_params(params)
        if fixed_params:
            try:
                cur.execute(add_link(), fixed_params)
            except sqlite3.IntegrityError:
                print(f"[ERROR] Integrity error in request {params}.", file=sys.stderr)
    for params in queue.folgezettels:
        try:
            cur.execute(add_folgezettel(), params)
        except sqlite3.IntegrityError:
            print(f"[ERROR] Integrity error in request {params}.", file=sys.stderr)
    conn.commit()
    conn.close()

def handle_requests(host, port, *, mute=True):
    server = Server((host, port), RequestHandler)
    with server:
        if not mute:
            print("Accepting connections at", server.server_address)
        server.serve_forever()

def main(*args, mute=True):
    try:
        host = args[0]
        port = int(args[1])
    except:
        host = "localhost"
        port = 0
    handle_requests(host, port, mute=mute)

if __name__ == "__main__":
    main(*sys.argv[1:], mute=False)
