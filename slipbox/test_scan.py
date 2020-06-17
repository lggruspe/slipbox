"""Test scan.py."""

import os
import tempfile
import time

from . import scan
from .mock import mock_database
from .utils import make_temporary_file, sqlite_string

def insert_file_script(*files):
    """Create SQL query string to insert into the Files table."""
    sql = "INSERT INTO Files (filename) VALUES ({})"
    return sql.format("), (".join(map(sqlite_string, files)))

def test_is_recently_modified():
    before = time.time()
    with make_temporary_file() as temp:
        os.utime(temp, ns=(time.time_ns(), time.time_ns()))
        after = time.time()
        modified_before = scan.is_recently_modified(before)
        modified_after = scan.is_recently_modified(after)
        assert modified_before(temp)
        assert not modified_after(temp)

        os.utime(temp, ns=(time.time_ns(), time.time_ns()))
        assert modified_after(temp)

def test_is_file_in_db():
    with make_temporary_file() as present,\
            make_temporary_file() as absent,\
            mock_database(insert_file_script(present)) as conn:
        assert scan.is_file_in_db(present, conn)
        assert not scan.is_file_in_db(absent, conn)

def test_has_valid_pattern():
    patterns = ("*.md", "*.rst")
    assert scan.has_valid_pattern("a.md", patterns)
    assert scan.has_valid_pattern("a.rst", patterns)
    assert not scan.has_valid_pattern("a.tex", patterns)

def test_files_in_path():
    basedir = os.path.curdir
    with tempfile.TemporaryDirectory(dir=basedir) as tempdir,\
            make_temporary_file(dir=tempdir) as inside,\
            make_temporary_file(dir=basedir) as outside,\
            tempfile.TemporaryDirectory(dir=tempdir) as nested:
        files = list(map(os.path.abspath, scan.files_in_path(tempdir)))
        assert inside in files
        assert outside not in files
        assert tempdir not in files
        assert nested not in files

def test_find_new_files():
    with make_temporary_file(suffix=".md") as present,\
            make_temporary_file(suffix=".md") as absent,\
            tempfile.TemporaryDirectory() as tempdir,\
            make_temporary_file(suffix=".txt") as txt,\
            mock_database(insert_file_script(present)) as conn:
        paths = [present, absent, tempdir, txt]
        new_files = list(scan.find_new_files(conn, paths))
        assert present not in new_files
        assert absent in new_files
        assert tempdir not in new_files
        assert txt not in new_files

def test_group_by_file_extension():
    files = ["a.md", "b.md", ".md", "c.tex", ".tex", ""]
    groups = list(map(list, scan.group_by_file_extension(files)))
    assert len(groups) == 5
    assert ["a.md", "b.md"] in groups
    assert [".md"] in groups
    assert ["c.tex"] in groups
    assert [".tex"] in groups
    assert [""] in groups

def test_group_by_file_extensions_on_the_same_type():
    files = [f"{c}.md" for c in "abcdefg"]
    groups = list(map(list, scan.group_by_file_extension(files)))
    assert len(groups) == 1
    assert files in groups

def test_build_command():
    output = "output.html"
    options = "--mathjax"
    assert not scan.build_command([], output, options)
    cmd = scan.build_command(["cha1.md", "cha2.md"], output, options)
    assert "cha1.md cha2.md" in cmd
    assert f"-o {output}" in cmd
    assert options in cmd

def test_grouped_build_commands():
    """grouped_build_commands must output one command per file extension.

    Files with no extension are run with their own command.
    """
    files = ["a.md", "b.md", ".md", "c.tex", ".tex"]
    commands = scan.grouped_build_commands(files)
    assert len(commands) == 4
    assert ".md" in commands[0][0]
    assert ".tex" in commands[1][0]
    assert "a.md b.md" in commands[2][0]
    assert "c.tex" in commands[3][0]

def test_remove_outdated_files_from_database():
    _, missing = tempfile.mkstemp()
    with make_temporary_file() as modified,\
            make_temporary_file() as temp,\
            mock_database(insert_file_script(missing, modified, temp)) as conn:
        assert scan.is_file_in_db(missing, conn)
        assert scan.is_file_in_db(modified, conn)
        assert scan.is_file_in_db(temp, conn)

        timestamp = time.time()
        os.remove(missing)
        os.utime(modified, ns=(time.time_ns(), time.time_ns()))
        scan.remove_outdated_files_from_database(conn, timestamp)

        assert not scan.is_file_in_db(missing, conn)
        assert not scan.is_file_in_db(modified, conn)
        assert scan.is_file_in_db(temp, conn)
