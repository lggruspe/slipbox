"""Test errors.py."""

from pathlib import Path

from slipbox.errors import ErrorFormatter, resolve_checkers


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
    assert "#0" in result
    assert "Foo" in result
    assert "Bar" in result
    assert "Baz" in result
    assert "foo.md" in result
    assert "bar.md" in result
    assert "baz.md" in result
    assert "Found errors :(" in result


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


def test_resolve_checkers_default() -> None:
    """When args are None, should return default checkers."""
    checkers = resolve_checkers(None, None)
    assert checkers
    assert "" not in checkers


def test_resolve_checkers_enabled_only() -> None:
    """Result should be set of checkers in comma-separated list."""
    enabled = "graph-cycle,isolated-note"
    checkers = resolve_checkers(enabled, None)
    assert set(enabled.split(",")) == checkers
    assert "" not in checkers


def test_resolve_checkers_disabled_only() -> None:
    """Result should contain default checkers - disabled checkers."""
    disabled = "graph-cycle,isolated-note"
    checkers = resolve_checkers(None, disabled)
    assert checkers
    assert "" not in checkers
    assert "graph-cycle" not in checkers
    assert "isolated-note" not in checkers


def test_resolve_checkers_default_all() -> None:
    """Default checkers are a subset of all checkers."""
    default = resolve_checkers(None, None)
    all_ = resolve_checkers("all", None)
    assert default.issubset(all_)
