"""Test templates.py."""

from slipbox.templates import Elem, render


def test_render_text() -> None:
    """String must render as itself."""
    text = "text"
    assert render(text) == text


def test_render_element() -> None:
    """Element must render with children and attributes."""
    elem = Elem("a", "link", href="#")
    assert render(elem) == """<a href='#'>
  link
</a>"""


def test_render_nested() -> None:
    """Nested element must render with proper indentation."""
    elem = Elem("p", Elem("a", "link", href="#"))
    assert render(elem) == """<p>
  <a href='#'>
    link
  </a>
</p>"""


def test_render_no_attributes() -> None:
    """Element with no attributes must have no space after tag."""
    elem = Elem("p", "text")
    assert render(elem) == """<p>
  text
</p>"""
