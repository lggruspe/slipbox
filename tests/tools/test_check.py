"""Test tools/check.py."""

from pathlib import Path
import pytest

from slipbox.app import App, startup
from slipbox.build import process_notes
from slipbox.dependencies import check_requirements
from slipbox.tools import check


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


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_invalid_links(test_app_with_root: App, test_md: Path) -> None:
    """invalid_links must return note and invalid ID."""
    app = test_app_with_root

    test_md.write_text("# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n")
    process_notes(app, [test_md])
    result = list(check.invalid_links(app))
    assert result == [((0, "Test", "test.md"), 1)]


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_isolated_notes(test_app_with_root: App, test_md: Path) -> None:
    """isolated_notes must return untagged notes only."""
    app = test_app_with_root
    test_md.write_text("""# 0 Foo

#test

[](#1)

# 1 Bar

# 2 Baz
""")
    process_notes(app, [test_md])
    result = list(check.isolated_notes(app))
    assert result == [(2, "Baz", "test.md")]


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_unsourced_notes_empty_bibliography(test_app_with_root: App,
                                            test_md: Path,
                                            ) -> None:
    """unsourced_notes must be empty if there is no bibliography."""
    app = test_app_with_root

    test_md.write_text("# 0 Test\n\nTest.\n")
    process_notes(app, [test_md])
    result = list(check.unsourced_notes(app))
    assert not result


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_unsourced_notes(test_app_with_root: App, test_md: Path, test_bib: Path) -> None:
    """unsourced_notes must include every note that has no citation."""
    app = test_app_with_root

    app.config.content_options += f" --bibliography {test_bib.resolve()!s}"
    test_md.write_text("""# 0 Foo

Foo.

# 1 Bar

Bar.

[@test_2020]
""")
    process_notes(app, [test_md])
    result = list(check.unsourced_notes(app))
    assert result == [(0, "Foo", "test.md")]


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_check_notes_empty(test_app_with_root: App,
                           capsys: pytest.CaptureFixture[str],
                           ) -> None:
    """check_notes must not output anything if there are no errors.

    The result must be True (no errors).
    """
    assert check.check_notes(test_app_with_root)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_check_notes(test_app_with_root: App,
                     capsys: pytest.CaptureFixture[str],
                     test_md: Path,
                     ) -> None:
    """check_notes must output to stdout.

    The result must be False (has errors).
    """
    app = test_app_with_root

    test_md.write_text("# 0 Test\n[](#1)")
    process_notes(app, [test_md])

    assert not check.check_notes(app)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert "Test" in stdout
    assert not stderr
