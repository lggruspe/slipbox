"""Test app.py."""

from pathlib import Path
import pytest
from slipbox import app
from slipbox.initializer import DotSlipbox
from slipbox.slipbox import Slipbox
from slipbox.utils import check_requirements


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_empty_stdout(tmp_path: Path,
                                capsys: pytest.CaptureFixture[str],
                                mnote: Path,
                                sbox: Slipbox,
                                ) -> None:
    """show_info shouldn't output anything if the note ID doesn't exist."""
    sbox.process([mnote])
    with Slipbox(DotSlipbox(tmp_path)) as slipbox:
        app.show_info(slipbox, 1)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_stdout(tmp_path: Path,
                          capsys: pytest.CaptureFixture[str],
                          mnote: Path,
                          sbox: Slipbox,
                          ) -> None:
    """show_info should output info of note with give note ID."""
    sbox.process([mnote])
    with Slipbox(DotSlipbox(tmp_path)) as slipbox:
        app.show_info(slipbox, 0)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr
