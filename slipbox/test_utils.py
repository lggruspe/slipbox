"""Test utils.py."""

import os
import shlex
import shutil
import pytest

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

@pytest.mark.skipif(not shutil.which("grep"), reason="requires grep")
def test_run_command(tmp_path):
    """run_command must return stdout and stderr output."""
    first = tmp_path/"first.txt"
    second = tmp_path/"second.txt"
    first.write_text("first")
    second.write_text("second")

    out, err = utils.run_command("grep first {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))
    assert not err
    assert str(first) in out.decode()
    assert str(second) not in out.decode()
    out, err = utils.run_command("grep second {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))
    assert not err
    assert str(first) not in out.decode()
    assert str(second) in out.decode()

@pytest.mark.skipif(not shutil.which("env"), reason="requires env")
def test_run_command_with_kwargs():
    """Keyword arguments to run_command must be used as environment variables.
    """
    out, err = utils.run_command("env", ZZZZZZZZZZ="ZZZZZZZZZZ")
    assert not err
    assert "ZZZZZZZZZZ=ZZZZZZZZZZ" in out.decode()
