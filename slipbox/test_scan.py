# type: ignore
"""Test scan.py."""

import os
import time

import pytest

from . import scan
from .utils import insert_file_script

def test_is_recently_modified(tmp_path):
    """is_recently_modified should return true iff the input file was modified
    after the specified timestamp.
    """
    before = time.time()
    path = tmp_path/"file"
    path.touch()
    os.utime(path, ns=(time.time_ns(), time.time_ns()))
    after = time.time()

    assert scan.is_recently_modified(before, path)
    assert not scan.is_recently_modified(after, path)

    os.utime(path, ns=(time.time_ns(), time.time_ns()))
    assert scan.is_recently_modified(after, path)

def test_is_file_in_db(mock_db, tmp_path):
    """Quick check for is_file_in_db."""
    conn = mock_db
    present = tmp_path/"present"
    absent = tmp_path/"absent"
    conn.executescript(insert_file_script(present.name))
    assert scan.is_file_in_db(present.name, conn)
    assert not scan.is_file_in_db(absent.name, conn)

def test_has_valid_pattern():
    """has_valid_pattern is true only for filenames that match at least one of
    the wildcard patterns."""
    patterns = ("*.md", "*.rst")
    assert scan.has_valid_pattern("a.md", patterns)
    assert scan.has_valid_pattern("a.rst", patterns)
    assert not scan.has_valid_pattern("a.tex", patterns)
    assert not scan.has_valid_pattern("a.md", (".md"))

def test_glob_files(tmp_path):
    """glob_files should return set of files in the given set of paths."""
    directory = tmp_path/"directory"
    directory.mkdir()
    directory.joinpath("subdirectory").mkdir()

    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"directory"/"c.md"
    file_d = tmp_path/"directory"/"d.md"
    file_e = tmp_path/"directory"/"subdirectory"/"e.md"

    file_a.touch()
    file_b.touch()
    file_c.touch()
    file_d.touch()
    file_e.touch()

    inputs = [file_a, file_b, directory]
    files = scan.glob_files(inputs)
    assert len(files) == 5
    assert file_a in files
    assert file_b in files
    assert file_c in files
    assert file_d in files
    assert file_e in files

def test_find_new_files(mock_db, tmp_path):
    """find_new_files must only return existing files that aren't yet in the
    database and match the input patterns (*.md by default).
    """
    conn = mock_db
    present = tmp_path/"present.md"
    absent = tmp_path/"absent.md"
    directory = tmp_path/"directory"
    txt = tmp_path/"ignore.txt"
    present.touch()
    absent.touch()
    directory.mkdir()
    txt.touch()

    conn.executescript(insert_file_script(present))
    new_files = list(scan.find_new_files(conn, [tmp_path]))
    assert new_files == [absent]

def test_group_by_file_extension():
    """group_by_file_extension should split by file type.

    Files with no extension should be considered their own type.
    """

    files = ["a.md", "b.md", ".md", "c.tex", ".tex", ""]
    groups = list(map(list, scan.group_by_file_extension(files)))
    assert len(groups) == 5
    assert ["a.md", "b.md"] in groups
    assert [".md"] in groups
    assert ["c.tex"] in groups
    assert [".tex"] in groups
    assert [""] in groups

def test_group_by_file_extension_on_the_same_type():
    """group_by_file_extension should group files with the same type together."""
    files = [f"{c}.md" for c in "abcdefg"]
    groups = list(map(list, scan.group_by_file_extension(files)))
    assert len(groups) == 1
    assert files in groups

def test_build_command(tmp_path):
    """Sanity check for build_command."""
    input_file = tmp_path/"input.md"
    output = "output.html"
    options = "--mathjax"
    input_file.touch()

    cmd = scan.build_command(input_file, output, options)
    assert str(input_file) in cmd
    assert f"-o {output}" in cmd
    assert options in cmd

@pytest.mark.xfail
def test_build_command_when_input_file_does_not_exist(tmp_path):
    """build_command must fail if input file does not exist."""
    input_file = tmp_path/"input.md"
    scan.build_command(input_file, "output.html", "")
