# pylint: disable=missing-function-docstring
"""Test serializer.py."""

from random import shuffle

from hypothesis import given, strategies as st
import networkx as nx   # type: ignore

from slipbox.serializer import are_equal_graphs, serialize, deserialize


def random_graph() -> st.SearchStrategy[nx.DiGraph]:
    """Create random graph strategy for testing."""
    return st.from_type(nx.DiGraph)


@given(random_graph())
def test_serialize_and_deserialize_are_inverse_functions(
    random_graph: nx.DiGraph,
) -> None:
    serialized = serialize(random_graph)
    deserialized = deserialize(serialized)

    assert are_equal_graphs(random_graph, deserialized)
    assert serialized == serialize(deserialized)


@given(random_graph())
def test_equal_graphs_serialize_the_same(random_graph: nx.DiGraph) -> None:
    """E.g. even if the edges are shuffled."""
    nodes = random_graph.nodes
    edges = random_graph.edges
    shuffle(nodes)
    shuffle(edges)

    shuffled_graph = nx.DiGraph()
    shuffled_graph.add_nodes_from(nodes)
    shuffled_graph.add_edges_from(edges)
