"""Test graph.py."""

from .graph import fetch_link_graph, fetch_sequence_graph
from .graph import fetch_backlinks, MultiDiGraph, write_dot_graph
from .mock import mock_database
from .utils import make_temporary_file

SAMPLE_SCRIPT_WITH_PARALLEL_EDGES = """
    PRAGMA foreign_keys=ON;
    INSERT INTO Files (filename) VALUES ('test.md');
    INSERT INTO Notes (id, title, filename) VALUES
        (0, 'root', 'test.md'),
        (1, 'src', 'test.md'),
        (2, 'dest', 'test.md');
    INSERT INTO Links (src, dest, annotation) VALUES
        (1, 2, 'annotation');
    INSERT INTO Aliases (id, owner, alias) VALUES
        (1, 0, '0a'),
        (2, 0, '0a1');
    INSERT INTO Sequences (prev, next) VALUES
        ('0a', '0a1');
"""

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
    edges = list(graph.edges)
    assert len(edges) == 4

    pairs = [(a, b) for a, b, _ in edges]
    for i in range(1, 5):
        assert sample_sequence_edge(i, 2*i) in pairs
    assert sample_sequence_edge(1, 3) not in pairs

def test_fetch_sequence_graph():
    """Sequence graph must contain exactly the edges that appear in the
    Sequences table.
    """
    with mock_database(sample_script()) as conn:
        graph = fetch_sequence_graph(conn)
    edges = list(graph.edges)
    assert len(edges) == 5

    pairs = [(a, b) for a, b, _ in edges]
    assert sample_sequence_edge(2, 3) in pairs
    assert sample_sequence_edge(2, 4) in pairs
    assert sample_sequence_edge(6, 7) in pairs
    assert sample_sequence_edge(6, 8) in pairs
    assert sample_sequence_edge(6, 9) in pairs

def test_fetch_backlinks():
    """Backlinks are reversed links with annotations."""
    with mock_database(sample_script()) as conn:
        graph = fetch_backlinks(conn)
    edges = list(graph.edges)
    assert len(edges) == 2

    pairs = [(a, b) for a, b, _ in edges]
    assert sample_sequence_edge(2, 1) in pairs
    assert sample_sequence_edge(4, 2) in pairs

def test_multidigraph_edd_edge():
    """MultiDiGraph.add_edge must insert endpoints and attributes."""
    graph = MultiDiGraph()
    assert not list(graph.edges)
    graph.add_edge(1, 2, color="red")
    graph.add_edge(2, 3)

    edges = list(graph.edges)
    pairs = [(a, b) for a, b, _ in edges]
    assert (1, 2) in pairs
    assert (2, 3) in pairs
    assert (1, 2, {"color": "red"}) in edges
    assert (2, 3, {}) in edges

def test_multidigraph_edges():
    """It must be possible to iterate through edges multiple times."""
    graph = MultiDiGraph()
    graph.add_edge(0, 0)
    graph.add_edge(0, 0)

    count = 0
    for _ in graph.edges:
        count += 1
    assert count == 2
    count = 0
    for _ in graph.edges:
        count += 1
    assert count == 2

def test_multidigraph_add_parallel_edges():
    """MultiDiGraph must be able to store parallel edges between two nodes."""
    graph = MultiDiGraph()
    graph.add_edge(1, 2)
    graph.add_edge(1, 2, color="red")
    graph.add_edge(1, 2, style="dashed")
    edges = list(graph.edges)
    assert len(edges) == 3
    attrs = []
    for src, dest, attr in edges:
        assert (src, dest) == (1, 2)
        attrs.append(attr)
    assert len(attrs) == 3
    assert attrs[0] == {}
    assert attrs[1] == {"color": "red"}
    assert attrs[2] == {"style": "dashed"}

def test_multidigraph_to_dot():
    """Test dot output."""
    graph = MultiDiGraph()
    graph.add_edge(1, 1, color="red")
    dot = graph.to_dot()
    assert "digraph {" in next(dot)
    assert "rankdir=LR;" in next(dot)
    line = next(dot)
    assert "1 -> 1" in line
    assert "color=red" in line
    assert "}" in next(dot)

def test_write_dot_graph():
    """Output dot graph must work with parallel edges."""
    with make_temporary_file() as temp,\
            mock_database(SAMPLE_SCRIPT_WITH_PARALLEL_EDGES) as conn:
        write_dot_graph(conn, True, True, True, temp)
        with open(temp) as file:
            lines = file.read().splitlines()

    dot = (line for line in lines)
    assert "digraph {" in next(dot)
    assert "rankdir=LR;" in next(dot)
    queue = sorted([next(dot), next(dot), next(dot)])
    assert "}" in next(dot)

    assert '"[1] src" -> "[2] dest";' in queue[0]
    assert '"[1] src" -> "[2] dest"' in queue[1]
    assert "color=red" in queue[1]
    assert '"[2] dest" -> "[1] src"' in queue[2]
    assert "style=dashed" in queue[2]
