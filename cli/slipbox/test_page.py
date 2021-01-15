# type: ignore
"""Test page.py."""

from os.path import join

import pytest
from . import page
from .utils import check_requirements

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

def test_data_path():
    """Check if path is constructed correctly."""
    path = page.data_path("frontend.js")
    assert join("data", "frontend.js") in str(path)

def test_data_shell_path():
    """Check if path is constructed and escaped correctly."""
    path = page.data_shell_path("frontend.js")
    assert join("data", "frontend.js") in str(path)

    path = page.data_shell_path("front end.js")
    assert path[0] == "'"
    assert join("data", "front end.js") + "'" in path

def test_create_bibliography(mock_db):
    """Check create_bibliography output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_bibliography(conn)
    assert html == \
"""<section id='references' title='References' class='level1'>
  <h1>
    References
  </h1>
  <dl>
    <dt>
      <a href='#ref-test'>
        [@test]
      </a>
    </dt>
    <dd>
      Reference text.
    </dd>
  </dl>
</section>"""

def test_create_tags(mock_db):
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
      <a href='###test'>
        ##test
      </a>
       (1)
    </li>
    <li>
      <a href='##test'>
        #test
      </a>
       (2)
    </li>
  </ul>
</section>"""

def test_create_tag_page(mock_db):
    """Check create_tag_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_tag_page(conn, "#test")
    assert html == """<section id='#test' title='#test' class='level1'>
  <h1>
    <a href='#tags' title='List of tags'>
      #test
    </a>
  </h1>
  <ol class='slipbox-list'>
    <li value='0'></li>
    <li value='1'></li>
  </ol>
</section>"""

def test_create_reference_page(mock_db):
    """Check create_reference_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_reference_page(conn, "ref-test")
    assert html == """<section id='ref-test' title='ref-test' class='level1'>
  <h1>
    <a href='#references'>
      @test
    </a>
  </h1>
  <p>
    Reference text.
  </p>
  <ol class='slipbox-list'>
    <li value='0'></li>
  </ol>
</section>"""

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_generate_complete_html(mock_db, tmp_path):
    """Sanity check."""
    options = ""
    page.generate_complete_html(mock_db, options, tmp_path)
