"""Test page.py."""

from pathlib import Path
import sqlite3

import pytest
from slipbox import page
from slipbox.utils import check_requirements

SQL = """
    PRAGMA foreign_keys=ON;
    INSERT INTO Files (filename) VALUES ('test.md');
    INSERT INTO Notes (id, title, filename) VALUES
        (0, '0', 'test.md'),
        (1, '1', 'test.md'),
        (2, '2', 'test.md');
    INSERT INTO Links (tag, src, dest) VALUES
        ('#test', 0, 0),
        ('#test', 1, 1),
        ('##test', 2, 2);
    INSERT INTO Bibliography (key, text) VALUES
        ('ref-test', 'Reference text.');
    INSERT INTO Citations (note, reference) VALUES
        (0, 'ref-test');
"""


def test_create_bibliography(mock_db: sqlite3.Connection) -> None:
    """Check create_bibliography output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_bibliography(conn)
    assert html == """<section id="references" class="level1" title="References">
<h1>References</h1>
<dl>
<dt><a href="#ref-test">[@test]</a></dt>
<dd>Reference text.</dd>

</dl>
</section>
"""


def test_create_tags(mock_db: sqlite3.Connection) -> None:
    """Check create_tags output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_tags(conn)
    assert html == """<section id='tags' title='Tags' class='level1'>
  <h1>
    Tags
  </h1>
  <ul>
    <li>
      <a href='#tags/#test'>
        ##test
      </a>
       (1)
    </li>
    <li>
      <a href='#tags/test'>
        #test
      </a>
       (2)
    </li>
  </ul>
</section>"""


def test_create_tag_page(mock_db: sqlite3.Connection) -> None:
    """Check create_tag_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_tag_page(conn, "#test")
    assert html == """<section id='tags/test' title='#test' class='level1'>
  <h1>
    #test
  </h1>
  <ol class='slipbox-list'>
    <li value='0'></li>
    <li value='1'></li>
  </ol>
</section>"""


def test_create_reference_page(mock_db: sqlite3.Connection) -> None:
    """Check create_reference_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_reference_page(conn, "ref-test")
    assert html == """<section id='ref-test' title='ref-test' class='level1'>
  <h1>
    @test
  </h1>
  <p>
    Reference text.
  </p>
  <ol class='slipbox-list'>
    <li value='0'></li>
  </ol>
</section>"""


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_generate_complete_html(mock_db: sqlite3.Connection,
                                tmp_path: Path,
                                ) -> None:
    """Sanity check."""
    options = ""
    page.generate_complete_html(mock_db, options, tmp_path)
