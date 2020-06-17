"""Visualize notes stored in database."""

import sqlite3
import sys

class DiGraph:
    """Represents directed graph."""
    def __init__(self):
        self.edges = {}

    def add_edge(self, src, dest, **kwargs):
        """Insert edge into directed graph, with dot attributes as additional
        keyword arguments.
        """
        self.edges[(src, dest)] = kwargs.copy()

    def to_dot(self):
        """Generate dot graph."""
        yield "digraph {\n"
        yield "\trankdir=LR;\n"
        for src, dest in self.edges:
            attrs = self.edges.get((src, dest))
            yield "\t{} -> {}{};\n".format(src, dest, "" if not attrs else\
                    "[{}]".format(",".join(f"{k}={v}" for k, v in attrs.items())))
        yield "}\n"

def fetch_link_graph(conn):
    """Get links from database and return a DiGraph."""
    sql = """
        SELECT src, dest, S.title, D.title
            FROM Links JOIN Notes AS S ON src = S.id
                JOIN Notes AS D ON dest = D.id
    """
    graph = DiGraph()
    cur = conn.cursor()
    for src, dest, src_title, dest_title in cur.execute(sql):
        graph.add_edge(f'"[{src}] {src_title}"', f'"[{dest}] {dest_title}"')
    return graph

def fetch_sequence_graph(conn):
    """Get sequences from database and return a DiGraph."""
    sql = """
        SELECT NP.id, NN.id, NP.title, NN.title
            FROM Sequences JOIN Aliases AS AP ON prev = AP.alias
                JOIN Aliases AS AN ON next = AN.alias
                    JOIN Notes AS NP ON AP.id = NP.id
                        JOIN Notes AS NN ON AN.id = NN.id
    """
    graph = DiGraph()
    cur = conn.cursor()
    for parent, child, ptitle, ctitle in cur.execute(sql):
        graph.add_edge(f'"[{parent}] {ptitle}"', f'"[{child}] {ctitle}"')
    return graph

def write_dot_graph(database, direct=False, sequence=False, out=sys.stdout):
    """Generate dot graph from database."""
    graph = DiGraph()
    with sqlite3.connect(database) as conn:
        if direct:
            for src, dest in fetch_link_graph(conn).edges:
                graph.add_edge(src, dest)
        if sequence:
            for src, dest in fetch_sequence_graph(conn).edges:
                graph.add_edge(src, dest, color="red")
    if isinstance(out, str):
        out = open(out, "w")
    with out:
        for line in graph.to_dot():
            print(line, file=out, end="")

if __name__ == "__main__":
    from argparse import ArgumentParser
    parser = ArgumentParser()
    parser.add_argument("database")
    parser.add_argument("-d", "--direct", action="store_true")
    parser.add_argument("-s", "--sequence", action="store_true")
    parser.add_argument("-o", dest="out", default=sys.stdout)
    args = parser.parse_args()
    write_dot_graph(args.database, args.direct, args.sequence, args.out)
