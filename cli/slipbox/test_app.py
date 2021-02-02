# type: ignore
"""Test app.py."""

import pytest

from .app import show_info
from .initializer import DotSlipbox
from .slipbox import Slipbox
from .utils import check_requirements

def test_show_info_timestamp_empty(tmp_path):
    """Calling show_info shouldn't affect the db timestamp."""
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        before = slipbox.timestamp
    show_info(dot, 0)
    with Slipbox(dot) as slipbox:
        after = slipbox.timestamp
    assert before == after

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_timestamp(tmp_path, mnote, sbox):
    """Calling show_info shouldn't affect the db timestamp."""
    sbox.process([mnote])
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        before = slipbox.timestamp
    show_info(dot, 0)
    with Slipbox(dot) as slipbox:
        after = slipbox.timestamp
    assert before == after

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_empty_stdout(tmp_path, capsys, mnote, sbox):
    """show_info shouldn't output anything if the note ID doesn't exist."""
    sbox.process([mnote])
    dot = DotSlipbox(tmp_path)
    show_info(dot, 1)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_stdout(tmp_path, capsys, mnote, sbox):
    """show_info should output info of note with give note ID."""
    sbox.process([mnote])
    dot = DotSlipbox(tmp_path)
    show_info(dot, 0)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr
