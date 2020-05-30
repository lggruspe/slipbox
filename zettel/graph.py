import re
import sqlite3
import sys
import networkx as nx
from networkx.drawing.nx_pydot import write_dot
from .config import Config

class Folgezettel:
    ntrail = re.compile(r"^(.*?)\d+$")
    atrail = re.compile(r"^(.*?)[a-zA-Z]+$")

    @staticmethod
    def parent(note):
        result = re.sub(Folgezettel.atrail, r"\1", note)
        if note != result:
            return result
        result = re.sub(Folgezettel.ntrail, r"\1", note)
        return result if note != result else None

def graph_links(pattern, output=sys.stdout):
    """Create dot graph of notes."""
    config = Config()
    sql = "SELECT src, dest FROM links WHERE src LIKE :pattern"
    G = nx.DiGraph()
    with sqlite3.connect(config.user.database) as conn:
        cur = conn.cursor()
        for src, dest in cur.execute(sql, {"pattern": pattern}):
            G.add_edge(src, dest)
    write_dot(G, output)

def graph_folgezettels(pattern, output=sys.stdout):
    """Create dot graph of sequence notes."""
    config = Config()
    sql = """
        SELECT note, outline, seqnum FROM folgezettels
            WHERE outline LIKE :pattern
    """
    notes = {}
    with sqlite3.connect(config.user.database) as conn:
        cur = conn.cursor()
        for note, outline, seqnum in cur.execute(sql, {"pattern": pattern}):
            notes[(outline, seqnum)] = note

    G = nx.DiGraph()
    for (outline, seqnum), note in notes.items():
        par_id = Folgezettel.parent(seqnum)
        parent = notes.get((outline, par_id))
        if parent:
            G.add_edge(parent, note)
    write_dot(G, output)
