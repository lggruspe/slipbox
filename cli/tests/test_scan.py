"""Test scan.py."""

from pathlib import Path
import sqlite3

import pytest
from slipbox import scan
from slipbox.utils import insert_files


def test_is_file_in_db(mock_db: sqlite3.Connection, tmp_path: Path) -> None:
    """Quick check for is_file_in_db."""
    present = tmp_path/"present"
    absent = tmp_path/"absent"
    present.touch()
    absent.touch()
    insert_files(mock_db, present, basedir=tmp_path)
    assert scan.is_file_in_db(Path(present.name), mock_db)
    assert not scan.is_file_in_db(Path(absent.name), mock_db)


def test_build_command(tmp_path: Path) -> None:
    """Sanity check for build_command."""
    input_file = tmp_path/"input.md"
    output = "output.html"
    options = "--mathjax"
    input_file.touch()

    cmd = scan.build_command(input_file, output, tmp_path, options)
    assert str(input_file) in cmd
    assert f"-o {output}" in cmd
    assert options in cmd


@pytest.mark.xfail
def test_build_command_when_input_file_does_not_exist(tmp_path: Path) -> None:
    """build_command must fail if input file does not exist."""
    input_file = tmp_path/"input.md"
    scan.build_command(input_file, "output.html", tmp_path, "")
