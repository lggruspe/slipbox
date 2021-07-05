# type: ignore
"""Test app.py."""

import pytest

from slipbox import app
from slipbox.initializer import DotSlipbox
from slipbox.slipbox import Slipbox
from slipbox.utils import check_requirements


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_empty_stdout(tmp_path, capsys, mnote, sbox):
    """show_info shouldn't output anything if the note ID doesn't exist."""
    sbox.process([mnote])
    with Slipbox(DotSlipbox(tmp_path)) as slipbox:
        app.show_info(slipbox, 1)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_stdout(tmp_path, capsys, mnote, sbox):
    """show_info should output info of note with give note ID."""
    sbox.process([mnote])
    with Slipbox(DotSlipbox(tmp_path)) as slipbox:
        app.show_info(slipbox, 0)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr


def test_has_gaps():
    """has_gaps should check if input has gaps."""
    assert not app.has_gaps([])
    assert not app.has_gaps([1])
    assert not app.has_gaps([2, 3])
    assert not app.has_gaps([4, 5, 6])

    assert app.has_gaps([7, 9])
    assert app.has_gaps([0, 2])


def test_find_available_id():
    """find_available_id should return smallest non-negative integer not in the
    input.
    """
    find = app.find_available_id
    assert find([]) == 0
    assert find([0]) == 1
    assert find([1]) == 0
    assert find(list(range(1, 10))) == 0
    assert find(list(range(10))) == 10
    assert find([0, 2]) == 1
    assert find([0, 1, 3]) == 2
