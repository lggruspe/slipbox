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

@pytest.mark.skipif(not shutil.which(utils.grep()), reason="requires grep")
def test_run_command(tmp_path):
    """run_command must return stdout and stderr output."""
    first = tmp_path/"first.txt"
    second = tmp_path/"second.txt"
    first.write_text("first")
    second.write_text("second")

    proc = utils.run_command("grep first {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))
    assert not proc.stderr
    assert not proc.returncode
    assert str(first) in proc.stdout.decode()
    assert str(second) not in proc.stdout.decode()
    proc = utils.run_command("grep second {} {}".format(
        shlex.quote(str(first)), shlex.quote(str(second))
    ))
    assert not proc.stderr
    assert str(first) not in proc.stdout.decode()
    assert str(second) in proc.stdout.decode()

@pytest.mark.skipif(not shutil.which("env"), reason="requires env")
def test_run_command_with_kwargs():
    """Keyword arguments to run_command must be used as environment variables.
    """
    proc = utils.run_command("env", ZZZZZZZZZZ="ZZZZZZZZZZ")
    assert not proc.stderr
    assert not proc.returncode
    assert "ZZZZZZZZZZ=ZZZZZZZZZZ" in proc.stdout.decode()
