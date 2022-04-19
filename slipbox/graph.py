"""Generate note graphs and graph layouts."""

import json
from sqlite3 import Connection
import typing as t

import networkx as nx   # type: ignore
from pyquery import PyQuery     # type: ignore

from .serializer import serialize


def create_graph(con: Connection) -> nx.DiGraph:
    """Construct graph from slipbox data."""
    graph = nx.DiGraph()

    sql = "SELECT id, filename FROM Notes"
    for id_, filename in con.execute(sql):
        graph.add_node(id_, filename=filename, tags=[])

    sql = "SELECT tag, id FROM Tags"
    for tag, id_ in con.execute(sql):
        graph.nodes[id_]["tags"].append(tag)

    sql = "SELECT src, dest, direction FROM ValidLinks"
    for src, dest, direction in con.execute(sql):
        if direction == "<":
            graph.add_edge(dest, src)
        else:
            graph.add_edge(src, dest)
    return graph


def concatenate(seqs: t.Iterable[t.Iterable[t.Any]]) -> t.List[t.Any]:
    """Concatenate sequences."""
    return sum(map(list, seqs), [])


def get_cluster(graph: nx.DiGraph, tag: str) -> nx.DiGraph:
    """Get subgraph with tag plus neighbors (preds and succs)."""
    tagged = [
        n for n, attrs in graph.nodes.items()
        if tag in attrs.get("tags")
    ]
    predecessors = concatenate(map(graph.predecessors, tagged))
    successors = concatenate(map(graph.successors, tagged))
    return graph.subgraph(tagged + predecessors + successors)


def get_components(graph: nx.DiGraph) -> t.Dict[t.Tuple[int, ...], nx.DiGraph]:
    """Get notes connected to note_id."""
    components = nx.algorithms.weakly_connected_components(graph)
    return {tuple(c): graph.subgraph(c) for c in components}


def without_self_loop(graph: nx.DiGraph) -> nx.DiGraph:
    """Return copy of graph without self-loops."""
    copy = graph.copy()
    copy.remove_edges_from(e for e in graph.edges if e[0] == e[1])
    return copy


def get_note_titles(con: Connection) -> t.Iterable[t.Tuple[int, str]]:
    """Get note title HTMLs."""
    sql = "SELECT id, html FROM Notes"
    for id_, html in con.execute(sql):
        doc = PyQuery(html)
        title = doc("h1:first").outer_html()
        yield (id_, title)


def compute_graph_layout(
    graph: nx.DiGraph,
    layout: str = "fdp",
) -> t.Dict[int, t.Tuple[float, float]]:
    """Compute graph layout using graphviz without using cache.

    Expects graph without self-loops.
    """
    positions = nx.drawing.nx_pydot.graphviz_layout(graph, prog=layout)
    return t.cast(t.Dict[int, t.Tuple[float, float]], positions)


def get_cached_graph_layout(
    con: Connection,
    key: str,
) -> t.Optional[t.Dict[int, t.Tuple[float, float]]]:
    """Return cached graph layout in json, or None."""
    sql = "SELECT layout FROM LayoutCache WHERE key = ?"

    cur = con.cursor()
    cur.execute(sql, (key,))
    row = cur.fetchone()
    if not row:
        return None

    cached = json.loads(row[0])
    return {int(k): v for k, v in cached.items()}


def save_graph_layout(con: Connection, key: str, value: str) -> None:
    """Save key value pair in LayoutCache.

    Assume that value is a valid JSON.
    Note: JSON keys are always strings.

    Caller is expected to commit changes afterward.
    """
    sql = """
        INSERT INTO LayoutCache (key, layout) VALUES (?, ?)
        ON CONFLICT (key) DO
        UPDATE SET layout = excluded.layout
        """
    con.execute(sql, (key, value))


def get_graph_layout(
    con: Connection,
    graph: nx.DiGraph,
    layout: str = "fdp",
) -> t.Dict[int, t.Tuple[float, float]]:
    """Get graph layout from LayoutCache or compute using graphviz.

    Expects graph without self-loops.
    """
    serialized = serialize(graph)
    cached = get_cached_graph_layout(con, serialized)
    if cached is not None:
        return cached

    result = compute_graph_layout(graph, layout)
    save_graph_layout(con, serialized, json.dumps(result))
    return result


def create_graph_data(
    con: Connection,
    titles: t.Dict[int, str],
    graph: nx.DiGraph,
    layout: str = "fdp",
) -> t.Dict[str, t.Any]:
    """Create cytoscape.js graph data from Graph.

    Note: removes self-loops.
    Prepares the graph layout and unpads title HTML.

    titles: dict of note IDs and title HTML fragments
    """
    copy = without_self_loop(graph)
    data = nx.readwrite.json_graph.cytoscape_data(copy)
    positions = get_graph_layout(con, copy, layout)

    for node in data["elements"]["nodes"]:
        node_id = int(node["data"]["id"])
        node["data"]["title"] = titles[node_id]
        x, y = positions[node_id]   # pylint: disable=invalid-name
        node["position"] = {"x": 2 * x, "y": -2 * y}
        # Scale y by -2 to flip the graph vertically so edges point downward.
    return t.cast(t.Dict[str, t.Any], data)
