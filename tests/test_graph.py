"""Test slipbox.graph."""

from pathlib import Path
import typing as t

import pytest

from slipbox.app import App
from slipbox.graph import create_reference_graph, create_tag_graph
from slipbox.build import build


@pytest.fixture
def bibfile(tmp_path: Path) -> t.Iterable[Path]:
    """Create bibfile "test.bib" with entries for @foo2020 and @bar2020."""
    bibfile = tmp_path/"test.bib"
    bibfile.write_text("""
@book{foo2020,
    title = {Foo},
    language = {English},
    author = {Author},
    year = {2020},
}

@book{bar2020,
    title = {Bar},
    language = {English},
    author = {Author},
    year = {2020},
}
""", encoding="utf-8")
    yield bibfile


@pytest.fixture
def bib_app(app: App, bibfile: Path) -> t.Iterable[App]:
    """An app object with a pre-configured bibfile."""
    app.config.bibliography = bibfile
    yield app


def scan(app: App) -> None:
    """Run 'slipbox build --no-output'."""
    app.args["output"] = False
    build(app)


def test_create_tag_graph_no_tags(app: App) -> None:
    """The graph should contain no edges."""
    scan(app)
    graph = create_tag_graph(app.database)
    assert not graph.nodes
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
    assert not graph.nodes
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
    assert not graph.nodes
    assert not graph.edges


def test_create_tag_graph_notes_multiple_tags(app: App) -> None:
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


def test_create_reference_graph_no_citations(bib_app: App) -> None:
    """The graph should be empty."""
    app = bib_app

    scan(app)
    graph = create_reference_graph(app.database)
    assert not graph.nodes
    assert not graph.edges


def test_create_reference_graph_links_between_notes_with_different_citations(
    bib_app: App,
) -> None:
    """Edge weights should count links between notes that cite different
    references."""
    app = bib_app

    Path("test.md").write_text("""
# 0 Foo

[@foo2020] [](#1)

# 1 Bar

[@bar2020]
""", encoding="utf-8")

    scan(app)
    graph = create_reference_graph(app.database)

    assert len(graph.edges) == 1

    key = ("ref-foo2020", "ref-bar2020")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 1

    # Let's also check node attributes while we're at it.
    assert "Foo" in graph.nodes["ref-foo2020"]["title"]
    assert "Bar" in graph.nodes["ref-bar2020"]["title"]


def test_create_reference_graph_links_between_notes_without_references(
    bib_app: App,
) -> None:
    """Edge weights should not count links between notes without references."""
    app = bib_app
    Path("test.md").write_text("""
# 0 Foo

[](#1)

# 1 Bar

[](#0)
""", encoding="utf-8")

    scan(app)
    graph = create_reference_graph(app.database)
    assert not graph.nodes
    assert not graph.edges


def test_create_reference_graph_links_between_notes_with_same_citations(
    bib_app: App,
) -> None:
    """Edge weights should not count links between the same references."""
    app = bib_app
    Path("test.md").write_text("""
# 0 Foo

[@foo2020] [](#1)

# 1 Bar

[@foo2020] [](#0)
""", encoding="utf-8")

    scan(app)
    graph = create_reference_graph(app.database)
    assert not graph.nodes
    assert not graph.edges


def test_create_reference_graph_notes_multiple_citations(bib_app: App) -> None:
    """Edge weights should count pairs of references cited by the same note."""
    app = bib_app
    Path("test.md").write_text("""
# 0 Test

[@foo2020] [@bar2020]
""", encoding="utf-8")

    scan(app)
    graph = create_reference_graph(app.database)

    assert len(graph.edges) == 1

    key = ("ref-foo2020", "ref-bar2020")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 1
