# type: ignore
"""Test app.py."""

import pytest

from . import app
from .initializer import DotSlipbox
from .slipbox import Slipbox
from .utils import check_requirements


def test_show_info_timestamp_empty(tmp_path):
    """Calling show_info shouldn't affect the db timestamp."""
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        before = slipbox.timestamp
    app.show_info(dot, 0)
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
    app.show_info(dot, 0)
    with Slipbox(dot) as slipbox:
        after = slipbox.timestamp
    assert before == after


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_empty_stdout(tmp_path, capsys, mnote, sbox):
    """show_info shouldn't output anything if the note ID doesn't exist."""
    sbox.process([mnote])
    dot = DotSlipbox(tmp_path)
    app.show_info(dot, 1)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_show_info_stdout(tmp_path, capsys, mnote, sbox):
    """show_info should output info of note with give note ID."""
    sbox.process([mnote])
    dot = DotSlipbox(tmp_path)
    app.show_info(dot, 0)
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert not stderr


def test_require_dot_slipbox(tmp_path, sbox):
    """require_dot_slipbox should return DotSlipbox object in current
    directory.
    """
    dot = app.require_dot_slipbox(tmp_path)
    assert dot.path == sbox.dot.path


def test_require_dot_slipbox_uninitialized(tmp_path):
    """require_dot_slipbox should abort the program."""
    with pytest.raises(SystemExit):
        app.require_dot_slipbox(tmp_path)


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
