"""Generate note graphs and graph layouts."""

from collections import Counter
import json
from sqlite3 import Connection
import typing as t

import networkx as nx   # type: ignore
from pyquery import PyQuery     # type: ignore

from .serializer import serialize


def extract_title(html: str) -> str:
    """Extract note title from its HTML."""
    doc = PyQuery(html)
    title = doc("h1:first").outer_html()
    return t.cast(str, title)


def create_note_graph(con: Connection) -> nx.DiGraph:
    """Construct note graph from slipbox data."""
    graph = nx.DiGraph()

    sql = "SELECT id, filename, html FROM Notes"
    for id_, filename, html in con.execute(sql):
        graph.add_node(
            id_,
            filename=filename,
            tags=[],
            references=[],
            path=str(id_),
            title=extract_title(html),
        )

    sql = "SELECT tag, id FROM Tags"
    for tag, id_ in con.execute(sql):
        graph.nodes[id_]["tags"].append(tag)

    sql = "SELECT note, reference FROM Citations"
    for id_, ref in con.execute(sql):
        graph.nodes[id_]["references"].append(ref)

    sql = "SELECT src, dest, direction FROM ValidLinks"
    for src, dest, direction in con.execute(sql):
        if direction == "<":
            graph.add_edge(dest, src)
        else:
            graph.add_edge(src, dest)
    return graph


def create_tag_graph(con: Connection) -> nx.Graph:
    """Construct graph of tags.

    Edges represent links between notes with different tags.
    """
    counter: Counter[tuple[str, str]] = Counter()

    # Count links between different notes with different tags.
    query = """
        SELECT A.tag, B.tag, count(*)
        FROM Links
        JOIN Tags AS A ON (A.id = src)
        JOIN Tags AS B ON (B.id = dest)
        WHERE A.tag != B.tag
        GROUP BY A.tag, B.tag
    """
    for tag_a, tag_b, count in con.execute(query):
        tag_a, tag_b = min(tag_a, tag_b), max(tag_a, tag_b)
        counter[(tag_a, tag_b)] += count

    # Count pairs of tags that appear in the same note.
    query = """
        SELECT A.tag, B.tag, count(*)
        FROM Tags AS A
        JOIN Tags AS B
        USING (id)
        WHERE A.tag < B.tag
        GROUP BY A.tag, B.tag
    """
    for tag_a, tag_b, count in con.execute(query):
        # Sort again just to be sure, because sqlite comparison might differ
        # from Python's.
        tag_a, tag_b = min(tag_a, tag_b), max(tag_a, tag_b)
        counter[(tag_a, tag_b)] += count

    # Build graph.
    graph = nx.Graph()

    # Add all tags, including isolated ones.
    for tag, in con.execute("SELECT tag FROM Tags"):
        # Strip prefix "#" from tags.
        tag = tag[1:]
        graph.add_node(
            tag,
            title=f"<h1>#{tag}</h1>",
            path=f"tags/{tag}",
        )

    # Add edges.
    for (tag_a, tag_b), count in counter.most_common():
        # Strip prefix "#" from tags.
        graph.add_edge(tag_a[1:], tag_b[1:], weight=count)
    return graph


def create_reference_graph(con: Connection) -> nx.Graph:
    """Construct graph of references.

    An edge between two references A and B means one of the following.

    - There's a link between a note that cites A and a note that cites B.
    - There's a note that cites both references.
    """
    counter: Counter[tuple[str, str]] = Counter()

    # Count links between notes.
    query = """
        SELECT A.reference, B.reference, count(*)
        FROM Links
        JOIN Citations AS A ON (A.note = src)
        JOIN Citations AS B ON (B.note = dest)
        WHERE A.reference != B.reference
        GROUP BY A.reference, B.reference
    """
    for ref_a, ref_b, count in con.execute(query):
        ref_a, ref_b = min(ref_a, ref_b), max(ref_a, ref_b)
        counter[(ref_a, ref_b)] += count

    # Count pairs of references cited by the same note.
    query = """
        SELECT A.reference, B.reference, count(*)
        FROM Citations AS A
        JOIN Citations AS B
        USING (note)
        WHERE A.reference < B.reference
        GROUP BY A.reference, B.reference
    """
    for ref_a, ref_b, count in con.execute(query):
        # Sort again just to be sure, because sqlite comparison might differ
        # from Python's.
        ref_a, ref_b = min(ref_a, ref_b), max(ref_a, ref_b)
        counter[(ref_a, ref_b)] += count

    # Build graph.
    graph = nx.Graph()

    # Add all references, including isolated ones.
    query = "SELECT key, html FROM Bibliography"
    for ref, title in con.execute(query):
        # Strip "ref-" prefix.
        ref = ref[4:]
        graph.add_node(ref, title=title, path=f"ref-{ref}")

    # Add edges.
    for (ref_a, ref_b), count in counter.most_common():
        # Strip "ref-" prefix.
        graph.add_edge(ref_a[4:], ref_b[4:], weight=count)
    return graph


def find_cycles(graph: nx.DiGraph) -> t.List[t.Tuple[int, int]]:
    """Return a cycle in the graph, if there's any.

    The result is a list of links (pairs of ints).
    """
    try:
        return t.cast(t.List[t.Tuple[int, int]], nx.find_cycle(graph))
    except nx.exception.NetworkXNoCycle:
        return []


def concatenate(seqs: t.Iterable[t.Iterable[t.Any]]) -> t.List[t.Any]:
    """Concatenate sequences."""
    return sum(map(list, seqs), [])


def get_reference_cluster(graph: nx.DiGraph, reference: str) -> nx.DiGraph:
    """Get subgraph of nodes that cite the reference plus neighbors."""
    cites = [
        n for n, attrs in graph.nodes.items()
        if reference in attrs.get("references")
    ]
    predecessors = concatenate(map(graph.predecessors, cites))
    successors = concatenate(map(graph.successors, cites))
    return graph.subgraph(cites + predecessors + successors)


def get_tag_cluster(graph: nx.DiGraph, tag: str) -> nx.DiGraph:
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


def compute_graph_layout(
    graph: nx.DiGraph,
) -> t.Dict[int, t.Tuple[float, float]]:
    """Compute graph layout using graphviz without using cache.

    Expects graph without self-loops.
    """
    # Delete HTML titles before sending to graphviz (pydot or graphviz breaks
    # otherwise).
    titles = {}
    for node, attrs in graph.nodes.items():
        titles[node] = attrs["title"]
        del attrs["title"]

    positions = nx.drawing.nx_pydot.graphviz_layout(graph, prog="fdp")

    # Put titles back.
    for node, title in titles.items():
        graph.nodes[node]["title"] = title

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
) -> t.Dict[int, t.Tuple[float, float]]:
    """Get graph layout from LayoutCache or compute using graphviz.

    Expects graph without self-loops.
    """
    serialized = serialize(graph)
    cached = get_cached_graph_layout(con, serialized)
    if cached is not None:
        return cached

    result = compute_graph_layout(graph)
    save_graph_layout(con, serialized, json.dumps(result))
    return result


def create_graph_data_with_layout(
    con: Connection,
    graph: nx.DiGraph,
) -> t.Dict[str, t.Any]:
    """Create cytoscape.js graph data from graph and computes graph layout.

    Also removes self-loops in the graph.
    """
    copy = without_self_loop(graph)
    data = nx.readwrite.json_graph.cytoscape_data(copy)
    positions = get_graph_layout(con, copy)

    for node in data["elements"]["nodes"]:
        node_id = int(node["data"]["id"])
        x, y = positions[node_id]   # pylint: disable=invalid-name
        node["position"] = {"x": 2 * x, "y": -2 * y}
        # Scale y by -2 to flip the graph vertically so edges point downward.
    return t.cast(t.Dict[str, t.Any], data)


def create_plain_graph_data(graph: nx.Graph) -> t.Dict[str, t.Any]:
    """Similar to `create_graph_data` with a few changes:

    - For undirected graphs instead of digraphs
    - Does not compute graph layouts
    """
    return t.cast(
        t.Dict[str, t.Any],
        nx.readwrite.json_graph.cytoscape_data(graph),
    )


def create_graph_data(con: Connection, graph: nx.Graph) -> t.Dict[str, t.Any]:
    """Convert graph to cytoscape JSON format.

    Computes graph layout if the graph is large enough.
    Accepts the same arguments as `create_graph_data_with_layout`.
    """
    if graph.order() <= 100:
        return create_plain_graph_data(graph)
    return create_graph_data_with_layout(con, graph)
