# type: ignore
"""Test utils.py."""

import shlex
import shutil

import pytest

from . import utils


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
    retcode = utils.run_command("env", dict(ZZZZZZZZZZ="ZZZZZZZZZZ"))
    stdout, stderr = capsys.readouterr()
    assert not stderr
    assert not retcode
    assert "ZZZZZZZZZZ=ZZZZZZZZZZ" in stdout


def test_print_sequence_empty(capsys):
    """print_sequence must not print anything if sequence is empty.

    The result must be False (empty).
    """
    assert not utils.print_sequence("error", [])
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


def test_print_sequence_not_empty(capsys):
    """print_sequence must print header if sequence is not empty.

    The result must be True (non-empty)."""
    assert utils.print_sequence("hello", ["world", "!"])
    stdout, stderr = capsys.readouterr()
    assert stdout
    assert "hello" in stdout
    assert "world" in stdout
    assert "!" in stdout
    assert not stderr
