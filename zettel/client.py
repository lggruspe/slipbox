import socket

def message(host, port, message):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.connect((host, port))
        sock.sendall(message.encode())
        return sock.recv(1024).decode() == "ok"

def shutdown(host, port):
    message(host, port, "shutdown")
