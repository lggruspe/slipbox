"""Graph serialiation."""

from itertools import chain
import typing as t

import networkx as nx   # type: ignore


def serialize(graph: nx.DiGraph) -> str:
    """Serialize directed graph."""
    return "\n".join(
        " ".join(chain([str(node)], map(str, sorted(graph.adj[node]))))
        for node in sorted(graph.nodes)
    )


def deserialize(adjacency: str) -> t.Optional[nx.DiGraph]:
    """Deserialize directed graph from adjacency list.

    Returns None on error.
    """
    graph = nx.DiGraph()
    for line in adjacency.splitlines():
        try:
            node, *dests = [int(node) for node in line.split()]
        except ValueError:
            return None
        graph.add_node(node)
        for dest in dests:
            graph.add_edge(node, dest)
    return graph


def are_equal_graphs(first: nx.DiGraph, second: nx.DiGraph) -> bool:
    """Do both graphs have the same set of nodes and the same set of edges?"""
    return bool(first.nodes == second.nodes) and \
        bool(first.edges == second.edges)
