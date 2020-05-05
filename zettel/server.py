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
            process(self.server)
            threading.Thread(target=self.server.shutdown).start()
        else:
            try:
                req = json.loads(data)
                req_t = req.get("type")
                params = req.get("data")
                if req_t == "note":
                    if params:
                        self.server.notes_queue.append(params)
                elif req_t == "link":
                    if params:
                        self.server.links_queue.append(params)
                elif req_t == "keyword":
                    if params:
                        self.server.keywords_queue.append(params)
                elif req_t == "sequence":
                    if params:
                        self.server.sequences_queue.append(params)
            except json.decoder.JSONDecodeError:
                pass

class Server(socketserver.TCPServer):
    notes_queue = []
    links_queue = []
    keywords_queue = []
    sequences_queue = []

def process(server):
    conn = sqlite3.connect(UserConfig().database)
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys = ON;")
    for params in server.notes_queue:
        # delete existing keywords and links in note but don't delete the note
        # itself to keep backlinks
        cur.execute(delete_note_keywords(), {
            "note": params.get("filename")
        })
        cur.execute(delete_note_links(), {
            "src": params.get("filename")
        })
        cur.execute(add_note(), params)
    for params in server.keywords_queue:
        cur.execute(add_keyword(), params)
    for params in server.links_queue:
        fixed_params = transform_link_params(params)
        if fixed_params:
            cur.execute(add_link(), fixed_params)
    for params in server.sequences_queue:
        fixed_params = transform_sequence_params(params)
        if fixed_params:
            cur.execute(add_sequence(), fixed_params)
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
