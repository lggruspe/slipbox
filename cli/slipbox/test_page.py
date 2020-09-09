# type: ignore
"""Test page.py."""

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
    INSERT INTO Tags (id, tag) VALUES
        (0, '#test'),
        (1, '#test'),
        (2, '##test');
    INSERT INTO Bibliography (key, text) VALUES
        ('ref-test', 'Reference text.');
    INSERT INTO Citations (note, reference) VALUES
        (0, 'ref-test');
"""

def test_create_bibliography(mock_db):
    """Check create_bibliography output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_bibliography(conn)
    assert html == \
"""<section id='references' title='References' style='display:none' class='level1'>
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
    assert html == """<section id='tags' title='Tags' style='display:none' class='level1'>
  <h1>
    Tags
  </h1>
  <ul>
    <li>
      <a href='###test'>
        ##test
      </a>
    </li>
    <li>
      <a href='##test'>
        #test
      </a>
    </li>
  </ul>
</section>"""

def test_create_tag_page(mock_db):
    """Check create_tag_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_tag_page(conn, "#test")
    assert html == """<section id='#test' title='#test' style='display:none' class='level1'>
  <h1>
    <a href='#tags' title='List of tags'>
      #test
    </a>
  </h1>
  <ul>
    <li>
      [0] 
      <a href='#0'>
        0
      </a>
    </li>
    <li>
      [1] 
      <a href='#1'>
        1
      </a>
    </li>
  </ul>
</section>"""

def test_create_reference_page(mock_db):
    """Check create_reference_page output."""
    conn = mock_db
    conn.executescript(SQL)
    html = page.create_reference_page(conn, "ref-test")
    assert html == """<section id='ref-test' title='ref-test' style='display:none' class='level1'>
  <h1>
    <a href='#references'>
      @test
    </a>
  </h1>
  <p>
    Reference text.
  </p>
  <ul>
    <li>
      [0] 
      <a href='#0'>
        0
      </a>
    </li>
  </ul>
</section>"""

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_generate_complete_html(mock_db):
    """Sanity check."""
    options = ""
    page.generate_complete_html(mock_db, options)
