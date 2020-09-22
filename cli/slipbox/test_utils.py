# type: ignore
"""Test utils.py."""

import shlex
import shutil

import pytest

from . import utils
from .initializer import initialize

def test_sqlite_string():
    """Single quotes must be escaped properly."""
    assert utils.sqlite_string("''") == "''''''"
    assert utils.sqlite_string("'foo'bar'") == "'''foo''bar'''"

def test_temporary_directory():
    """temporary_directory gets deleted when the context manager exits."""
    with utils.temporary_directory() as temp:
        path = temp
        assert temp.exists()
        assert temp.is_dir()
    assert not path.exists()

@pytest.mark.skipif(not shutil.which("grep"), reason="requires grep")
def test_run_command(tmp_path, capsys):
    """run_command must return returncode and capture stdout and stderr."""
    first = tmp_path/"first.txt"
    second = tmp_path/"second.txt"
    first.write_text("first")
    second.write_text("second")

    retcode = utils.run_command("grep first {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))

    stdout, stderr = capsys.readouterr()
    assert not stderr
    assert not retcode
    assert str(first) in stdout
    assert str(second) not in stdout

    retcode = utils.run_command("grep second {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))
    stdout, stderr = capsys.readouterr()
    assert not stderr
    assert str(first) not in stdout
    assert str(second) in stdout

@pytest.mark.skipif(not shutil.which("env"), reason="requires env")
def test_run_command_with_kwargs(capsys):
    """Keyword arguments to run_command must be used as environment variables.
    """
    retcode = utils.run_command("env", ZZZZZZZZZZ="ZZZZZZZZZZ")
    stdout, stderr = capsys.readouterr()
    assert not stderr
    assert not retcode
    assert "ZZZZZZZZZZ=ZZZZZZZZZZ" in stdout

def test_find_dot_slipbox(tmp_path):
    """find_dot_slipbox must look for .slipbox in parent directories."""
    assert utils.find_dot_slipbox(tmp_path) is None

    dot = tmp_path.joinpath(".slipbox")
    initialize(tmp_path)
    assert utils.find_dot_slipbox(tmp_path) == dot

    child = tmp_path/"child"
    child.mkdir()
    assert utils.find_dot_slipbox(child) == dot

    for file in dot.iterdir():
        file.unlink()
    dot.rmdir()
    assert utils.find_dot_slipbox(child) is None
    assert utils.find_dot_slipbox(tmp_path) is None
