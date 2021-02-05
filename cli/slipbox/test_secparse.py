# type: ignore
"""Test secparse.py."""

from .secparse import note_id, parse_sections


def test_note_id():
    """Test note_id on different inputs.."""
    assert note_id("div", [("id", "1")]) is None
    assert note_id("section", [("id", None)]) is None
    assert note_id("section", [("id", "-1")]) is None
    assert note_id("section", [("id", "42")]) == 42


def test_parse_sections():
    """Test parse_sections."""
    section1 = '<section id="1">&gt;<!--comment--><hr /></section>'
    section2 = '<section id="2"><section>&#x3E;</section></section>'
    test_html = section1 + '\n' + section2

    result = []

    def callback(this):
        result.append((this.id_, this.section.strip()))
    parse_sections(test_html, callback)

    assert result == [(1, section1), (2, section2)]
