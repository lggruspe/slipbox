# type: ignore
"""Generate note graph."""

import networkx as nx


def create_graph(con):
    """Construct graph from slipbox data."""
    graph = nx.MultiDiGraph()

    sql = "SELECT id, title, filename FROM Notes"
    for id_, title, filename in con.execute(sql):
        graph.add_node(id_, title=title, filename=filename)

    sql = "SELECT src, dest, tag FROM ValidLinks"
    for src, dest, tag in con.execute(sql):
        graph.add_edge(src, dest, tag=tag)
    return graph


def get_cluster(graph, tag):
    """Get subgraph with tag."""
    return graph.edge_subgraph(
        e for e, attrs in graph.edges.items()
        if attrs.get("tag") == tag
    )


def get_components(graph):
    """Get notes connected to note_id."""
    components = nx.algorithms.weakly_connected_components(graph)
    return {tuple(c): graph.subgraph(c) for c in components}


def without_self_loop(graph):
    """Return copy of graph without self-loops."""
    copy = graph.copy()
    copy.remove_edges_from(e for e in graph.edges if e[0] == e[1])
    return copy


def create_graph_data(graph, layout="fdp"):
    """Create cytoscape.js graph data from Graph.

    Note: removes self-loops."""
    copy = without_self_loop(graph)
    data = nx.readwrite.json_graph.cytoscape_data(copy)
    layout = nx.drawing.nx_pydot.graphviz_layout(copy, prog=layout)

    for node in data["elements"]["nodes"]:
        node_id = int(node["data"]["id"])
        x, y = layout[node_id]  # pylint: disable=invalid-name
        node["position"] = {"x": 2 * x, "y": -2 * y}
        # Scale y by -2 to flip the graph vertically so edges point downward.
    return data
