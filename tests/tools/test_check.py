"""Test tools/check.py."""

from pathlib import Path
import pytest

from slipbox.tools import check
from slipbox.initializer import DotSlipbox
from slipbox.slipbox import Slipbox
from slipbox.utils import check_requirements


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


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_invalid_links(sbox: Slipbox, test_md: Path) -> None:
    """invalid_links must return note and invalid ID."""
    test_md.write_text("# 0 Test\n[](#1)\n\n# 2 Test\n[](#0)\n")
    sbox.process([test_md])
    result = list(check.invalid_links(sbox))
    assert result == [((0, "Test", "test.md"), 1)]


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_isolated_notes(sbox: Slipbox, test_md: Path) -> None:
    """isolated_notes must return untagged notes only."""
    test_md.write_text("""# 0 Foo

#test

[](#1)

# 1 Bar

# 2 Baz
""")
    sbox.process([test_md])
    result = list(check.isolated_notes(sbox))
    assert result == [(2, "Baz", "test.md")]


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_unsourced_notes_empty_bibliography(sbox: Slipbox,
                                            test_md: Path,
                                            ) -> None:
    """unsourced_notes must be empty if there is no bibliography."""
    test_md.write_text("# 0 Test\n\nTest.\n")
    sbox.process([test_md])
    result = list(check.unsourced_notes(sbox))
    assert not result


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_unsourced_notes(sbox: Slipbox, test_md: Path, test_bib: Path) -> None:
    """unsourced_notes must include every note that has no citation."""
    config = sbox.config
    config["slipbox"]["content_options"] += " --bibliography " + \
        str(test_bib.resolve())
    with open(sbox.dot.path/"config.cfg", "w") as configfile:
        config.write(configfile)
    test_md.write_text("""# 0 Foo

Foo.

# 1 Bar

Bar.

[@test_2020]
""")
    sbox.process([test_md])
    result = list(check.unsourced_notes(sbox))
    assert result == [(0, "Foo", "test.md")]


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_check_notes_empty(capsys: pytest.CaptureFixture[str],
                           tmp_path: Path,
                           ) -> None:
    """check_notes must not output anything if there are no errors.

    The result must be True (no errors).
    """
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        is_ok = check.check_notes(slipbox)
        assert is_ok
        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_check_notes(sbox: Slipbox,
                     capsys: pytest.CaptureFixture[str],
                     tmp_path: Path,
                     test_md: Path,
                     ) -> None:
    """check_notes must output to stdout.

    The result must be False (has errors).
    """
    test_md.write_text("# 0 Test\n[](#1)")
    sbox.process([test_md])
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        is_ok = check.check_notes(slipbox)
        assert not is_ok
        stdout, stderr = capsys.readouterr()
        assert stdout
        assert "Test" in stdout
        assert not stderr
