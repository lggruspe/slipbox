"""Test slipbox.graph."""

from pathlib import Path
import shutil
import typing as t

import pytest

from slipbox.app import App
from slipbox.graph import (
    create_note_graph,
    create_reference_graph,
    create_tag_graph,
)
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


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_tag_graph_no_tags(app: App) -> None:
    """The graph should contain no edges."""
    scan(app)
    graph = create_tag_graph(app.database)
    assert not graph.nodes
    assert not graph.edges


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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

    key = ("bar", "foo")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 2


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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

    assert len(graph.nodes) == 1
    assert "foo" in graph.nodes


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_tag_graph_notes_multiple_tags(app: App) -> None:
    """Edge weights should count pairs of tags in the same note."""
    Path("test.md").write_text("""
# 0 Test

#foo #bar #baz
""", encoding="utf-8")
    scan(app)
    graph = create_tag_graph(app.database)

    assert len(graph.edges) == 3
    assert graph.edges[("foo", "bar")]["weight"] == 1
    assert graph.edges[("bar", "baz")]["weight"] == 1
    assert graph.edges[("foo", "baz")]["weight"] == 1


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_tag_graph_isolated_tags(app: App) -> None:
    """Tag graph should contain nodes for isolated tags."""
    Path("test.md").write_text("""
# 0 Foo

#foo

# 1 Bar

#bar
""", encoding="utf-8")
    scan(app)
    graph = create_tag_graph(app.database)

    assert not graph.edges
    assert len(graph.nodes) == 2

    assert "foo" in graph.nodes
    assert "bar" in graph.nodes


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_reference_graph_no_citations(bib_app: App) -> None:
    """The graph should be empty."""
    app = bib_app

    scan(app)
    graph = create_reference_graph(app.database)
    assert not graph.nodes
    assert not graph.edges


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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

    key = ("foo2020", "bar2020")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 1

    # Let's also check node attributes while we're at it.
    assert "Foo" in graph.nodes["foo2020"]["title"]
    assert "Bar" in graph.nodes["bar2020"]["title"]


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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
    assert not graph.edges

    assert len(graph.nodes) == 1
    assert "foo2020" in graph.nodes


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
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

    key = ("foo2020", "bar2020")
    edge = graph.edges[key]
    weight = edge["weight"]

    assert weight == 1


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_reference_graph_isolated_references(bib_app: App) -> None:
    """Reference graph should contain nodes for isolated references."""
    app = bib_app
    Path("test.md").write_text("""
# 0 Foo

[@foo2020]

# 1 Bar

[@bar2020]
""", encoding="utf-8")
    scan(app)
    graph = create_reference_graph(app.database)

    assert not graph.edges
    assert len(graph.nodes) == 2

    assert "foo2020" in graph.nodes
    assert "bar2020" in graph.nodes


@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_create_note_graph_node_attributes(bib_app: App) -> None:
    """Graph nodes should contain the following attributes.

    - filename
    - tags
    - references
    - title (HTML)
    """
    app = bib_app

    Path("test.md").write_text("""
# 0 Test

Test. #test [@foo2020]
""", encoding="utf-8")
    scan(app)

    graph = create_note_graph(app.database)

    assert len(graph.nodes) == 1

    note = graph.nodes[0]
    assert note["filename"] == "test.md"
    assert note["tags"] == ["#test"]
    assert note["references"] == ["ref-foo2020"]
    assert "Test" in note["title"]
    assert "h1" in note["title"]
