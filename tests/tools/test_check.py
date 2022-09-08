"""Test tools/check.py."""

from pathlib import Path

import pytest

from slipbox.app import App, startup
from slipbox.build import build
from slipbox.dependencies import check_requirements
from slipbox.tools import check


def scan(app: App) -> None:
    """Run 'slipbox build --no-output'."""
    app.args["output"] = False
    build(app)


def test_print_sequence_empty(capsys: pytest.CaptureFixture[str]) -> None:
    """print_sequence must not print anything if sequence is empty.

    The result must be False (empty).
    """
    assert not check.print_sequence("error", [])
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


def test_print_sequence_not_empty(capsys: pytest.CaptureFixture[str]) -> None:
    """print_sequence must print header if sequence is not empty.

    The result must be True (non-empty)."""
    assert check.print_sequence("hello", ["world", "!"])
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert "hello" in stdout
    assert "world" in stdout
    assert "!" in stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})),
                    reason="missing requirements")
class TestsWithRequirements:
    """Tests with external requirements (e.g. pandoc, graphviz, etc.)."""
    def test_invalid_links(self, app: App) -> None:
        """invalid_links must return note and invalid ID."""
        Path("test.md").write_text(
            "# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n",
            encoding="utf-8",
        )
        scan(app)

        result = list(check.invalid_links(app))
        assert result == [((0, "Test", "test.md"), 1)]

    def test_isolated_notes(self, app: App) -> None:
        """isolated_notes must return untagged notes only."""
        Path("test.md").write_text("""# 0 Foo

#test

[](#1)

# 1 Bar

# 2 Baz
""", encoding="utf-8")
        scan(app)

        result = list(check.isolated_notes(app))
        assert result == [(2, "Baz", "test.md")]

    def test_unsourced_notes_empty_bibliography(self, app: App) -> None:
        """unsourced_notes must be empty if there is no bibliography."""
        Path("test.md").write_text("# 0 Test\n\nTest.\n", encoding="utf-8")
        scan(app)

        result = list(check.unsourced_notes(app))
        assert not result

    def test_unsourced_notes(self, app: App) -> None:
        """unsourced_notes must include every note that has no citation."""
        app.config.bibliography = Path("test.bib")

        Path("test.bib").write_text("""
@book{test_2020,
    title = {Title},
    language = {English},
    author = {Author},
    year = {2020},
}
""")

        Path("test.md").write_text("""# 0 Foo

Foo.

# 1 Bar

Bar.

[@test_2020]
""", encoding="utf-8")
        scan(app)

        result = list(check.unsourced_notes(app))
        assert result == [(0, "Foo", "test.md")]

    def test_check_notes_empty(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """check_notes must not output anything if there are no errors.

        The result must be True (no errors).
        """
        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

    def test_check_notes(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """check_notes must output to stdout.

        The result must be False (has errors).
        """
        Path("test.md").write_text("# 0 Test\n[](#1)", encoding="utf-8")
        scan(app)

        assert not check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert stdout
        assert "Test" in stdout
        assert not stderr
