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


@pytest.mark.skipif(not check_requirements(startup({})),
                    reason="missing requirements")
class TestsWithRequirements:
    """Tests with external requirements (e.g. pandoc, graphviz, etc.)."""
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
