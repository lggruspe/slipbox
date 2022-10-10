"""Test tools/check.py."""

from pathlib import Path

import pytest

from slipbox import check
from slipbox.app import App, startup
from slipbox.build import build
from slipbox.dependencies import check_requirements


def scan(app: App) -> None:
    """Run 'slipbox build --no-output'."""
    app.args["output"] = False
    build(app)


@pytest.mark.skipif(
    not check_requirements(startup({})),
    reason="missing requirements",
)
class TestsWithRequirements:
    """Tests with external requirements (e.g. pandoc, graphviz, etc.)."""
    def test_check_empty_links(self, app: App) -> None:
        """check_empty_links must return only notes with empty links."""
        Path("test.md").write_text(
            "# 0 Foo\n\nFoo. []()\n\n# 1 Bar\n\nBar.\n",
            encoding="utf-8",
        )
        scan(app)

        result = list(check.check_empty_links(app))
        assert result == [
            dict(
                id=0,
                title="Foo",
                filename="test.md",
            ),
        ]

    def test_check_invalid_links(self, app: App) -> None:
        """check_invalid_links must return note and invalid ID."""
        Path("test.md").write_text(
            "# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n",
            encoding="utf-8",
        )
        scan(app)

        result = list(check.check_invalid_links(app))
        assert result == [
            dict(
                note=dict(
                    id=0,
                    title="Test",
                    filename="test.md",
                ),
                target=1,
            ),
        ]

    def test_check_invalid_links_with_empty_links(self, app: App) -> None:
        """check_invalid_links shouldn't raise errors for empty links."""
        Path("test.md").write_text("# 0 Test []()", encoding="utf-8")
        scan(app)

        result = list(check.check_invalid_links(app))
        assert not result

    def test_check_isolated_notes(self, app: App) -> None:
        """check_isolated_notes must return untagged notes only."""
        Path("test.md").write_text("""# 0 Foo

#test

[](#1)

# 1 Bar

# 2 Baz
""", encoding="utf-8")
        scan(app)

        result = list(check.check_isolated_notes(app))
        assert result == [
            dict(
                id=2,
                title="Baz",
                filename="test.md",
            ),
        ]

    def test_check_unsourced_notes_empty_bibliography(self, app: App) -> None:
        """check_unsourced_notes must be empty if there is no bibliography."""
        Path("test.md").write_text("# 0 Test\n\nTest.\n", encoding="utf-8")
        scan(app)

        result = list(check.check_unsourced_notes(app))
        assert not result

    def test_check_unsourced_notes(self, app: App) -> None:
        """check_unsourced_notes must include every note without a citation."""
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

        result = list(check.check_unsourced_notes(app))
        assert result == [
            dict(
                id=0,
                title="Foo",
                filename="test.md",
            ),
        ]

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

    def test_check_notes_with_empty_links(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """check_notes must include empty-link-target check."""
        Path("test.md").write_text("# 0 Test\n[]()", encoding="utf-8")
        scan(app)
        capsys.readouterr()

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

        app.error_formatter.reset()
        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()

        assert "Empty link target" in stdout
        assert "#0" in stdout
        assert "Test" in stdout
        assert "test.md" in stdout

        assert not stderr

    def test_check_notes_graph_cycle_default(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """graph-cycle check should be disabled by default."""
        Path("test.md").write_text("# 0 Test\n[](#0)", encoding="utf-8")
        scan(app)

        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr

    def test_check_notes_graph_cycle_enabled_with_one_note(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """check_notes should catch graph cycles."""
        Path("test.md").write_text("# 0 Test\n[](#0)", encoding="utf-8")
        app.args["enable"] = "graph-cycle"
        scan(app)

        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert stdout
        assert not stderr

        assert "Graph cycle" in stdout
        assert "#0" in stdout
        assert "Test" in stdout
        assert "test.md" in stdout
        assert "warning" in stdout
        assert "error" not in stdout

    def test_check_notes_graph_cycle_enabled_with_multiple_notes(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Only notes in the cycle should appear in the warning message."""
        Path("test.md").write_text("""
# 0 Foo

Foo. [](#1)

# 1 Bar

Bar. [](#0)

# 2 Baz

Baz.
""", encoding="utf-8")
        app.args["enable"] = "graph-cycle"
        scan(app)

        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert stdout
        assert not stderr

        assert "Graph cycle" in stdout
        assert "test.md" in stdout

        assert "#0" in stdout
        assert "Foo" in stdout

        assert "#1" in stdout
        assert "Bar" in stdout

        assert "#2" not in stdout
        assert "Baz" not in stdout

        assert "warning" in stdout
        assert "error" not in stdout

    def test_check_notes_all_graph_cycle(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """'all' should enable 'graph-cycle'."""
        Path("test.md").write_text("# 0 Test\n[](#0)", encoding="utf-8")
        app.args["enable"] = "all"
        scan(app)

        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()
        assert stdout
        assert not stderr

        assert "Graph cycle" in stdout
        assert "#0" in stdout
        assert "Test" in stdout
        assert "test.md" in stdout
        assert "warning" in stdout
        assert "error" not in stdout

    def test_check_notes_with_multiple_errors(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """`slipbox check` should catch all errors, not just the first one."""
        Path("test.md").write_text("""
# 0 Foo

[]()

[](#0)
""", encoding="utf-8")
        app.args["enable"] = "all"
        scan(app)

        assert check.check_notes(app)
        stdout, stderr = capsys.readouterr()

        assert stdout
        assert not stderr

        assert "Empty link target" in stdout
        assert "Graph cycle" in stdout
