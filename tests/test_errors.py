"""Test errors.py."""

from pathlib import Path

from slipbox.errors import ErrorFormatter


def test_error_formatter_duplicate_messages() -> None:
    """Duplicate messages should be minimized."""
    Path("test.json").write_text("""
[
    {
        "name": "duplicate-note-id",
        "value": {
            "id": 0,
            "notes": [
                {
                    "title": "Foo",
                    "filename": "foo.md"
                },
                {
                    "title": "Bar",
                    "filename": "bar.md"
                }
            ]
        }
    },
    {
        "name": "duplicate-note-id",
        "value": {
            "id": 0,
            "notes": [
                {
                    "title": "Foo",
                    "filename": "foo.md"
                },
                {
                    "title": "Baz",
                    "filename": "baz.md"
                }
            ]
        }
    }
]
""", encoding="utf-8")
    formatter = ErrorFormatter()
    formatter.add_errors(Path("test.json"))

    result = formatter.format().strip()
    assert result == """error: Duplicate note ID

  #0 Foo (foo.md)
  #0 Bar (bar.md)
  #0 Baz (baz.md)

Found errors :("""


def test_error_formatter_warnings_only() -> None:
    """'Found errors :(' text shouldn't appear in output."""
    Path("test.json").write_text("""
[
    {
        "name": "empty-link-target",
        "value": {
            "id": 0,
            "title": "Test",
            "filename": "test.md"
        }
    }
]
""", encoding="utf-8")
    formatter = ErrorFormatter()
    formatter.add_errors(Path("test.json"))

    result = formatter.format().strip()
    assert "Found errors" not in result
