"""Test utils.py."""

import os

from . import utils

def test_get_contents():
    """get_contents must read the entire file, while write_lines must each item
    on a new line.
    """
    with utils.make_temporary_file() as temp:
        assert utils.get_contents(temp) == ""
        utils.write_lines(temp, ["hello", "world"])
        assert utils.get_contents(temp) == "hello\nworld\n"
        utils.write_lines(temp, ["bye", "bye"])
        assert utils.get_contents(temp) == "bye\nbye\n"

def test_sqlite_string():
    """Single quotes must be escaped properly."""
    assert utils.sqlite_string("''") == "''''''"
    assert utils.sqlite_string("'foo'bar'") == "'''foo''bar'''"

def test_make_temporary_file():
    """make_temporary_file must automatically delete file, and must call mkstemp
    with the correct parameters.
    """
    with utils.make_temporary_file(suffix=".txt", text=True) as temp:
        filename = temp
        assert os.path.exists(filename)
    assert not os.path.exists(filename)
    _, ext = os.path.splitext(filename)
    assert ext == ".txt"
