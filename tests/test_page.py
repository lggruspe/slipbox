"""Test page.py."""

import sqlite3
import typing as t

import pytest
from slipbox import page
from slipbox.app import App, startup
from slipbox.database import migrate
from slipbox.dependencies import check_requirements

SQL = """
    PRAGMA foreign_keys=ON;
    INSERT INTO Files (filename) VALUES ('test.md');
    INSERT INTO Notes (id, title, filename, html) VALUES
        (0, '0', 'test.md', '<section><h1>0</h1><p>Foo.</p></section>'),
        (1, '1', 'test.md', '<section><h1>1</h1><p>Bar.</p></section>'),
        (2, '2', 'test.md', '<section><h1>2</h1><p>Baz.</p></section>');
    INSERT INTO Tags (tag, id) VALUES
        ('#test', 0),
        ('#test', 1),
        ('##test', 2);
    INSERT INTO Links (src, dest) VALUES
        (0, 0),
        (1, 1),
        (2, 2);
    INSERT INTO Bibliography (key, html) VALUES
        ('ref-test', 'Reference text.');
    INSERT INTO Citations (note, reference) VALUES
        (0, 'ref-test');
"""


@pytest.fixture
def mock_db() -> t.Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as con:
        migrate(con)
        yield con


def test_render_references(mock_db: sqlite3.Connection) -> None:
    """Check render_references output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.render_references(conn)
    # pylint: disable=line-too-long
    assert html == """<section id="references" class="level1" title="References" role="doc-bibliography">
<h1>References</h1>
<dl>
<dt role="doc-biblioentry"><a href="#ref-test">[@test]</a></dt>
<dd>Reference text.</dd>
</dl>
</section>
"""  # noqa


def test_render_tags(mock_db: sqlite3.Connection) -> None:
    """Check render_tags output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.render_tags(conn)
    assert html == """<section id="tags" title="Tags" class="level1">
<h1>Tags</h1>
<ul>
<li><a href="#tags/#test">##test</a> (1)</li>
<li><a href="#tags/test">#test</a> (2)</li>
</ul>

</section>
"""


def test_render_tag_page(mock_db: sqlite3.Connection) -> None:
    """Check render_tag_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.render_tag_page(conn, "#test")
    assert html == """<section id='tags/test' title='#test' class='level1'>
  <h1>
    #test
  </h1>
  <ul class="slipbox-list">
    <li value="0">0 – <a href="#0">0</a></li>
    <li value="1">1 – <a href="#1">1</a></li>
  </ul>
</section>"""


def test_render_reference_page(mock_db: sqlite3.Connection) -> None:
    """Check render_reference_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.render_reference_page(conn, "ref-test")
    assert html == """<section id='ref-test' title='ref-test' class='level1'>
  <h1>
    @test
  </h1>
  <p>
    Reference text.
  </p>
  <ul class="slipbox-list">
    <li value="0">0 – <a href="#0">0</a></li>
  </ul>
</section>"""


@pytest.mark.skipif(not check_requirements(startup({})),
                    reason="missing requirements")
def test_generate_index(mock_db: sqlite3.Connection, app: App) -> None:
    """Sanity check."""
    app.database = mock_db
    page.generate_index(app, app.root)
