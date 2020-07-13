"""Test scan.py."""

import os
import shutil
import tempfile
import time

import pytest

from . import scan
from .utils import make_temporary_file, sqlite_string

def insert_file_script(*files):
    """Create SQL query string to insert into the Files table."""
    sql = "INSERT INTO Files (filename) VALUES ({})"
    return sql.format("), (".join(map(sqlite_string, files)))

def test_is_recently_modified(tmp_path):
    before = time.time()
    path = tmp_path/"file"
    path.touch()
    os.utime(path, ns=(time.time_ns(), time.time_ns()))
    after = time.time()
    modified_before = scan.is_recently_modified(before)
    modified_after = scan.is_recently_modified(after)

    assert modified_before(path)
    assert not modified_after(path)

    os.utime(path, ns=(time.time_ns(), time.time_ns()))
    assert modified_after(path)

def test_is_file_in_db(mock_db, tmp_path):
    conn = mock_db
    present = tmp_path/"present"
    absent = tmp_path/"absent"
    conn.executescript(insert_file_script(present.name))
    assert scan.is_file_in_db(present.name, conn)
    assert not scan.is_file_in_db(absent.name, conn)

def test_has_valid_pattern():
    patterns = ("*.md", "*.rst")
    assert scan.has_valid_pattern("a.md", patterns)
    assert scan.has_valid_pattern("a.rst", patterns)
    assert not scan.has_valid_pattern("a.tex", patterns)

def test_files_in_path(tmp_path):
    subdir = tmp_path/"subdir"
    inside = subdir/"inside.md"
    outside = tmp_path/"outside.md"
    nested = subdir/"nested"
    subdir.mkdir()
    inside.touch()
    outside.touch()
    nested.mkdir()

    files = list(map(os.path.abspath, scan.files_in_path(subdir)))
    assert str(inside) in files
    assert str(outside) not in files
    assert str(subdir) not in files
    assert str(nested) not in files

def test_find_new_files(mock_db):
    conn = mock_db
    with make_temporary_file(suffix=".md") as present,\
            make_temporary_file(suffix=".md") as absent,\
            tempfile.TemporaryDirectory() as tempdir,\
            make_temporary_file(suffix=".txt") as txt:
        conn.executescript(insert_file_script(present))
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

def test_remove_outdated_files_from_database(mock_db):
    conn = mock_db
    _, missing = tempfile.mkstemp()
    with make_temporary_file() as modified,\
            make_temporary_file() as temp:
        conn.executescript(insert_file_script(missing, modified, temp))
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

@pytest.mark.skipif(not shutil.which("pandoc"), reason="requires pandoc")
def test_scan(mock_db, tmp_path):
    """Smoke test for scan."""
    input_file = tmp_path/"input.md"
    input_file.write_text("# 1 Test note\n\nHello, world!\n")
    assert not list(mock_db.execute("SELECT * FROM Html"))
    scan.scan(mock_db, [str(input_file)], "", False)
    assert len(list(mock_db.execute("SELECT * FROM Html"))) == 1
