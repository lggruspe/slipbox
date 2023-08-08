"""Test slipbox.graph."""

from pathlib import Path

from slipbox.app import App
from slipbox.graph import create_tag_graph
from slipbox.build import build


def scan(app: App) -> None:
    """Run 'slipbox build --no-output'."""
    app.args["output"] = False
    build(app)


def test_create_tag_graph_with_no_tags(app: App) -> None:
    """The graph should contain no edges."""
    scan(app)
    graph = create_tag_graph(app.database)
    assert not graph.edges


def test_create_tag_graph_links_between_notes_with_different_tags(
    app: App,
) -> None:
    """Edge weights should count links between notes with different tags."""
    Path("test.md").write_text("""
# 0 Foo

#foo [](#1)

# 1 Bar

#bar [](#0)
""", encoding="utf-8")
    scan(app)

    graph = create_tag_graph(app.database)

    assert len(graph.edges) == 1

    key = ("#bar", "#foo")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 2


def test_create_tag_graph_links_between_untagged_notes(app: App) -> None:
    """Edge weights should not count links between untagged notes."""
    Path("test.md").write_text("""
# 0 Foo

[](#1)

# 1 Bar

[](#0)
""", encoding="utf-8")
    scan(app)
    graph = create_tag_graph(app.database)
    assert not graph.edges


def test_create_tag_graph_links_between_notes_with_same_tags(app: App) -> None:
    """Edge weights should not count links between the same tags."""
    Path("test.md").write_text("""
# 0 Foo

#foo [](#1)

# 1 Bar

#foo [](#1)
""", encoding="utf-8")
    scan(app)
    graph = create_tag_graph(app.database)
    assert not graph.edges


def test_create_tag_graph_notes_with_multiple_tags(app: App) -> None:
    """Edge weights should count pairs of tags in the same note."""
    Path("test.md").write_text("""
# 0 Test

#foo #bar #baz
""", encoding="utf-8")
    scan(app)
    graph = create_tag_graph(app.database)

    assert len(graph.edges) == 3
    assert graph.edges[("#foo", "#bar")]["weight"] == 1
    assert graph.edges[("#bar", "#baz")]["weight"] == 1
    assert graph.edges[("#foo", "#baz")]["weight"] == 1
