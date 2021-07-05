# type: ignore
"""Test scan.py."""

import pytest

from slipbox import scan
from slipbox.utils import insert_files


def test_is_file_in_db(mock_db, tmp_path):
    """Quick check for is_file_in_db."""
    present = tmp_path/"present"
    absent = tmp_path/"absent"
    present.touch()
    absent.touch()
    insert_files(mock_db, present, basedir=tmp_path)
    assert scan.is_file_in_db(present.name, mock_db)
    assert not scan.is_file_in_db(absent.name, mock_db)


def test_has_valid_pattern(tmp_path):
    """has_valid_pattern is true only for filenames that match at least one of
    the wildcard patterns.
    """
    patterns = ("*.md", "*.rst")
    a_md = tmp_path/"a.md"
    a_rst = tmp_path/"a.rst"
    a_tex = tmp_path/"a.tex"

    assert scan.has_valid_pattern(a_md, patterns, tmp_path)
    assert scan.has_valid_pattern(a_rst, patterns, tmp_path)
    assert not scan.has_valid_pattern(a_tex, patterns, tmp_path)
    assert not scan.has_valid_pattern(a_md, (".md"), tmp_path)


def test_has_valid_pattern_with_parent(tmp_path):
    """has_valid_pattern should work with patterns that contain directories.
    """
    patterns = ("notes/*.md",)
    test_md = tmp_path/"test.md"
    notes_test_md = tmp_path/"notes"/"test.md"
    assert not scan.has_valid_pattern(test_md, patterns, tmp_path)
    assert scan.has_valid_pattern(notes_test_md, patterns, tmp_path)


def test_build_command(tmp_path):
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
def test_build_command_when_input_file_does_not_exist(tmp_path):
    """build_command must fail if input file does not exist."""
    input_file = tmp_path/"input.md"
    scan.build_command(input_file, "output.html", tmp_path, "")
