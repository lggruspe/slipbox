"""Visualize notes stored in database."""

import sqlite3
import sys

class MultiDiGraph:
    """Represents directed graph with parallel edges."""
    def __init__(self):
        self.attributes = {}

    @property
    def edges(self):
        """Generate edges with attributes."""
        for edge, attrs in self.attributes.items():
            src, dest = edge
            for attr in attrs:
                yield src, dest, attr

    def add_edge(self, src, dest, **kwargs):
        """Insert edge from src to dest with attributes in kwargs."""
        self.attributes.setdefault((src, dest), [])
        self.attributes[(src, dest)].append(kwargs.copy())

    def to_dot(self):
        """Generate dot graph."""
        yield "digraph {\n"
        yield "\trankdir=LR;\n"
        for src, dest, attrs in self.edges:
            yield "\t{} -> {}{};\n".format(src, dest, "" if not attrs else\
                    "[{}]".format(",".join(f"{k}={v}" for k, v in attrs.items())))
        yield "}\n"

def fetch_link_graph(con):
    """Get links from database and return a MultiDiGraph."""
    sql = """
        SELECT src, dest, S.title, D.title
            FROM Links JOIN Notes AS S ON src = S.id
                JOIN Notes AS D ON dest = D.id
    """
    graph = MultiDiGraph()
    for src, dest, src_title, dest_title in con.execute(sql):
        graph.add_edge(f'"[{src}] {src_title}"', f'"[{dest}] {dest_title}"')
    return graph

def fetch_sequence_graph(con):
    """Get sequences from database and return a MultiDiGraph."""
    sql = """
        SELECT NP.id, NN.id, NP.title, NN.title
            FROM Sequences JOIN Aliases AS AP ON prev = AP.alias
                JOIN Aliases AS AN ON next = AN.alias
                    JOIN Notes AS NP ON AP.id = NP.id
                        JOIN Notes AS NN ON AN.id = NN.id
    """
    graph = MultiDiGraph()
    for parent, child, ptitle, ctitle in con.execute(sql):
        graph.add_edge(f'"[{parent}] {ptitle}"', f'"[{child}] {ctitle}"')
    return graph

def fetch_backlinks(con):
    """Get backlinks from database and return a MultiDiGraph."""
    sql = """
        SELECT dest, D.title, src, S.title FROM StrongLinks
            JOIN Notes AS D ON D.id = dest
                JOIN Notes AS S ON S.id = src
    """
    graph = MultiDiGraph()
    for dest, dtitle, src, stitle in con.execute(sql):
        graph.add_edge(f'"[{dest}] {dtitle}"', f'"[{src}] {stitle}"')
    return graph

def write_dot_graph(con, direct=False, sequence=False, backlinks=False,
                    out=sys.stdout):
    """Generate dot graph from database."""
    graph = MultiDiGraph()
    if direct:
        for src, dest, _ in fetch_link_graph(con).edges:
            graph.add_edge(src, dest)
    if sequence:
        for src, dest, _ in fetch_sequence_graph(con).edges:
            graph.add_edge(src, dest, color="red")
    if backlinks:
        for src, dest, _ in fetch_backlinks(con).edges:
            graph.add_edge(src, dest, style="dashed")
    if isinstance(out, str):
        out = open(out, "w")
    with out:
        for line in graph.to_dot():
            print(line, file=out, end="")

if __name__ == "__main__":
    from argparse import ArgumentParser
    parser = ArgumentParser(
        description="Generate a dot file to visualize your slipbox notes.")
    parser.add_argument("database", help="filename of sqlite3 database")
    parser.add_argument("-d", "--direct", action="store_true",
                        help="show direct links")
    parser.add_argument("-s", "--sequence", action="store_true",
                        help="show sequence links")
    parser.add_argument("-b", "--backlink", action="store_true",
                        help="show backlinks")
    parser.add_argument("-o", "--out", default=sys.stdout, help="output file")
    args = parser.parse_args()
    with sqlite3.connect(args.database) as conn:
        write_dot_graph(conn, args.direct, args.sequence, args.backlink,
                        args.out)
