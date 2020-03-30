import socketserver
import sqlite3
import sys
import threading

from .config import Config

class RequestHandler(socketserver.BaseRequestHandler):
    def handle(self):
        data = self.request.recv(1024).decode().strip()
        self.request.sendall(b"ok")
        if data == "shutdown":
            process(self.server.queue)
            threading.Thread(target=self.server.shutdown).start()
        else:
            self.server.queue.append(data)

class Server(socketserver.TCPServer):
    queue = []

def process(queue):
    conn = sqlite3.connect(Config.database)
    cur = conn.cursor()
    for req in queue:
        cur.execute(req)
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
