# pylint: disable=missing-function-docstring
"""Test serializer.py."""

from random import shuffle
import typing as t

from hypothesis import given, strategies as st
import networkx as nx   # type: ignore
import pytest

from slipbox.serializer import are_equal_graphs, serialize, deserialize


def random_nodes() -> st.SearchStrategy[t.List[int]]:
    """Strategy for generating list of ints with no duplicates."""
    return st.lists(st.integers(min_value=0), unique=True)


def random_edges() -> st.SearchStrategy[t.List[t.Tuple[int, int]]]:
    """Strategy for generating list of (int, int)s with no duplicates."""
    pairs = st.tuples(st.integers(min_value=0), st.integers(min_value=0))
    return st.lists(pairs, unique=True)


@st.composite
def random_graph(draw: st.DrawFn) -> nx.DiGraph:
    """Create random graph strategy for testing."""
    graph = nx.DiGraph()
    graph.add_nodes_from(draw(random_nodes()))
    graph.add_edges_from(draw(random_edges()))
    return graph


@pytest.mark.xfail
@given(random_graph())
def test_random_graph_produces_trivial_graphs(
    random_graph: nx.DiGraph,
) -> None:
    assert random_graph.edges


@pytest.mark.xfail
@given(random_graph())
def test_random_graph_produces_non_trivial_graphs(
    random_graph: nx.DiGraph,
) -> None:
    assert not random_graph.edges


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
    nodes = list(random_graph.nodes)
    edges = list(random_graph.edges)
    shuffle(nodes)
    shuffle(edges)

    shuffled_graph = nx.DiGraph()
    shuffled_graph.add_nodes_from(nodes)
    shuffled_graph.add_edges_from(edges)

    assert serialize(random_graph) == serialize(shuffled_graph)


def assert_is_sorted(items: t.Sequence[int]) -> None:
    """Check if all items are in sorted order."""
    for i in range(1, len(items)):
        assert items[i-1] <= items[i]


@given(random_graph())
def test_serialized_elements_are_sorted(random_graph: nx.DiGraph) -> None:
    nodes = []
    lines = serialize(random_graph).splitlines()
    for line in lines:
        node, *rest = line.split()
        nodes.append(int(node))
        assert_is_sorted([int(node) for node in rest])
    assert_is_sorted(nodes)
