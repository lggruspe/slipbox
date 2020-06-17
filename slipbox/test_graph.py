"""Test graph.py."""

from .graph import DiGraph, fetch_link_graph, fetch_sequence_graph
from .mock import mock_database

def sample_script():
    """Sample script to initialize mock database."""
    return """
    PRAGMA foreign_keys=ON;
    INSERT INTO Files (filename) VALUES ('test.md');
    INSERT INTO Notes (id, title, filename) VALUES
        (1, 'Note 1', 'test.md'),
        (2, 'Note 2', 'test.md'),
        (3, 'Note 3', 'test.md'),
        (4, 'Note 4', 'test.md'),
        (5, 'Note 5', 'test.md'),
        (6, 'Note 6', 'test.md'),
        (7, 'Note 7', 'test.md'),
        (8, 'Note 8', 'test.md'),
        (9, 'Note 9', 'test.md');
    -- i -> 2*i
    INSERT INTO Links (src, dest, annotation) VALUES
        (1, 2, 'annotation'),
        (2, 4, 'annotation'),
        (3, 6, ''),
        (4, 8, '');
    INSERT INTO Aliases (id, owner, alias) VALUES
        (2, 1, '1a'),
        (3, 1, '1a1'),
        (4, 1, '1a2'),
        (6, 5, '5a'),
        (7, 5, '5a1'),
        (8, 5, '5a2'),
        (9, 5, '5a3');
    INSERT INTO Sequences (prev, next) VALUES
        ('1a', '1a1'),
        ('1a', '1a2'),
        ('5a', '5a1'),
        ('5a', '5a2'),
        ('5a', '5a3');
    """

def sample_sequence_edge(src, dest):
    """Create edge with labeled nodes based on the sample data."""
    name = lambda i: f'"[{i}] Note {i}"'
    return (name(src), name(dest))

def test_fetch_link_graph():
    """Graph must contain exactly the edges that appear in the Links table,
    including unannotated links.
    """
    with mock_database(sample_script()) as conn:
        graph = fetch_link_graph(conn)
    assert len(graph.edges) == 4
    for i in range(1, 5):
        assert sample_sequence_edge(i, 2*i) in graph.edges
    assert sample_sequence_edge(1, 3) not in graph.edges

def test_fetch_sequence_graph():
    """Sequence graph must contain exactly the edges that appear in the
    Sequences table.
    """
    with mock_database(sample_script()) as conn:
        graph = fetch_sequence_graph(conn)
    assert len(graph.edges) == 5
    assert sample_sequence_edge(2, 3) in graph.edges
    assert sample_sequence_edge(2, 4) in graph.edges
    assert sample_sequence_edge(6, 7) in graph.edges
    assert sample_sequence_edge(6, 8) in graph.edges
    assert sample_sequence_edge(6, 9) in graph.edges

def test_digraph_add_edge():
    """DiGraph.add_edge must insert endpoints and attributes."""
    graph = DiGraph()
    assert not graph.edges
    graph.add_edge(1, 2, color="red")
    graph.add_edge(2, 3)
    assert (1, 2) in graph.edges
    assert (2, 3) in graph.edges
    assert graph.edges[(1, 2)]["color"] == "red"
    assert not graph.edges[(2, 3)]

def test_digraph_to_dot():
    """Test dot output."""
    graph = DiGraph()
    graph.add_edge(1, 1, color="red")
    dot = graph.to_dot()
    assert "digraph {" in next(dot)
    assert "rankdir=LR;" in next(dot)
    line = next(dot)
    assert "1 -> 1" in line
    assert "color=red" in line
    assert "}" in next(dot)
