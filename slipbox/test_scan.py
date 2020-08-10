# type: ignore
"""Test scan.py."""

import os
import time

import pytest

from . import scan
from .utils import check_requirements, insert_file_script

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

def test_build_command():
    """Sanity check for build_command."""
    output = "output.html"
    options = "--mathjax"
    assert not scan.build_command("  ", output, options)
    cmd = scan.build_command("cha1.md cha2.md", output, options)
    assert "cha1.md cha2.md" in cmd
    assert f"-o {output}" in cmd
    assert options in cmd

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan(mock_db, tmp_path):
    """Smoke test for scan."""
    input_file = tmp_path/"input.md"
    input_file.write_text("# 1 Test note\n\nHello, world!\n")
    assert not list(mock_db.execute("SELECT * FROM Html"))
    scan.scan(mock_db, [input_file], "", False)
    assert len(list(mock_db.execute("SELECT * FROM Html"))) == 1

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_empty_file(mock_db, tmp_path):
    """Scanned files that are empty shouldn't have entries in the database."""
    empty = tmp_path/"empty.md"
    empty.touch()
    scan.scan(mock_db, [empty], "", False)
    assert not list(mock_db.execute("SELECT * FROM Files"))
    assert not list(mock_db.execute("SELECT * FROM Notes"))
    assert not list(mock_db.execute("SELECT * FROM Tags"))
    assert not list(mock_db.execute("SELECT * FROM Links"))
    assert not list(mock_db.execute("SELECT * FROM Aliases"))
    assert not list(mock_db.execute("SELECT * FROM Sequences"))
    assert not list(mock_db.execute("SELECT * FROM Html"))
    assert not list(mock_db.execute("SELECT * FROM Sections"))
    assert not list(mock_db.execute("SELECT * FROM Bibliography"))
    assert not list(mock_db.execute("SELECT * FROM Citations"))

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_filenames(mock_db, tmp_path):
    """Filenames must be grepped from input files only."""
    markdown = tmp_path/"foo.md"
    skip = tmp_path/"bar.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    scan.scan(mock_db, [markdown], "", False)

    result = list(mock_db.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(result[0][0])

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_filenames0(mock_db, tmp_path):
    """Filenames must be grepped from input files only."""
    markdown = tmp_path/"bar.md"
    skip = tmp_path/"foo.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    scan.scan(mock_db, [markdown], "", False)

    result = list(mock_db.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(result[0][0])

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_external_sequence_links(mock_db, tmp_path, capsys):
    """The root of the note alias must be the same as note ID that
    defines the alias.

    Aliases that don't follow this rule are ignored.
    scan must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Bar](#1 '0a')

# 1 Bar

[Bar](#1 '0b')
""")
    scan.scan(mock_db, [markdown], "", False)
    result = list(mock_db.execute("""
        SELECT id, owner, alias FROM Aliases ORDER BY alias
    """))
    assert len(result) == 2
    assert result[0] == (0, 0, '0')
    assert result[1] == (1, 0, '0a')

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_non_level1_headers(mock_db, tmp_path):
    """Only level 1 headers must be considered as note headers."""
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Valid note header

Foo.

## 1 Invalid note header

Bar.
""")
    scan.scan(mock_db, [markdown], "", False)
    result = [nid for nid, in mock_db.execute("SELECT id FROM Notes")]
    assert len(result) == 1
    assert result == [0]

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_duplicate_existing_id(mock_db, tmp_path, capsys):
    """scan must show a warning if a new note shares ID of an existing note.

    The warning message must show the filenames of both notes.
    """
    file_a = tmp_path/"a.md"
    file_a.write_text("# 0 Existing note\n\nTest.\n")

    scan.scan(mock_db, [file_a], "", False)
    result = list(mock_db.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

    file_b = tmp_path/"b.md"
    file_b.write_text("# 0 Duplicate note\n\nTest.\n")

    scan.scan(mock_db, [file_b], "", False)
    result = list(mock_db.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
    assert str(file_a) in stderr
    assert str(file_b) in stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_duplicate_ids_in_a_file(mock_db, tmp_path, capsys):
    """If there are duplicate IDs in a file, only the first one must be saved.

    scan must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 First note

Foo.

# 0 Duplicate

Bar.
""")
    scan.scan(mock_db, [markdown], "", False)
    result = list(mock_db.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "First note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_different_alias_owner(mock_db, tmp_path, capsys):
    """A note can't define a note alias with a different root note.

    scan must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Foo](#2 '1a')

# 1 Bar

Bar.

# 2 Baz

Baz.
""")
    scan.scan(mock_db, [markdown], "", False)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_missing_alias(mock_db, tmp_path, capsys):
    """scan must show a warning if there's a gap in an alias sequence."""
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Bar](#1 '0a')
[Baz](#2 '0a1a')

# 1 Bar

Bar.

# 2 Baz

Baz.
""")
    scan.scan(mock_db, [markdown], "", False)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_blank_grep(mock_db, tmp_path, capsys, monkeypatch):
    """scan must ignore GREP="" variable setting."""
    markdown = tmp_path/"test.md"
    markdown.write_text("# 0 Test\n\nTest.\n")
    monkeypatch.setenv("GREP", "")
    scan.scan(mock_db, [markdown], "", False)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_scan_with_duplicate_aliases(mock_db, tmp_path, capsys):
    """If a note defines duplicate aliases, only the first one must be saved.

    scan must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Bar](#1 '0a')
[Baz](#2 '0a')

# 1 Bar

Bar.

# 2 Baz

Baz.
""")
    scan.scan(mock_db, [markdown], "", False)
    result = list(mock_db.execute("SELECT id FROM Aliases WHERE alias = '0a'"))
    assert len(result) == 1
    assert result == [(1,)]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
