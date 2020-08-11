# type: ignore
"""Test slipbox.py."""

from time import time

import pytest

from .config import Config
from .slipbox import Slipbox, added_notes, modified_notes, deleted_notes
from .utils import check_requirements, insert_file_script

def test_added_notes_pattern(tmp_path, sbox):
    """added_notes must match the input pattern."""
    slipbox = sbox
    slipbox.config.patterns = ('*.md', '*.txt')

    directory = tmp_path/"directory"
    markdown = tmp_path/"input.md"
    txt = tmp_path/"input.txt"
    tex = tmp_path/"ignore.tex"
    directory.mkdir()
    markdown.touch()
    txt.touch()
    tex.touch()

    notes = added_notes(slipbox)
    assert sorted(notes) == [markdown, txt]

def test_added_notes_in_db(tmp_path, sbox):
    """added_notes must not already be in the database."""
    slipbox = sbox

    new = tmp_path/"new.md"
    skip = tmp_path/"skip.md"
    new.touch()
    skip.touch()
    slipbox.conn.executescript(insert_file_script(skip))
    assert added_notes(slipbox) == [new]

def test_added_notes_recursive(tmp_path, sbox):
    """added_notes must find files recursively."""
    slipbox = sbox

    directory = tmp_path/"directory"
    new = directory/"new.md"
    directory.mkdir()
    new.touch()
    assert added_notes(slipbox) == [new]

def test_slipbox_context_manager(tmp_path):
    """Test database timestamp."""
    config = Config(database=tmp_path/"slipbox.db")
    with Slipbox(config) as slipbox:
        assert slipbox.timestamp == 0.0
    with Slipbox(config) as slipbox:
        assert slipbox.timestamp != 0.0

def test_modified_notes(tmp_path, sbox):
    """modified_notes must exclude the following notes:

    - Notes that aren't in the database
    - Notes in the database that haven't been modified
    """
    modified = tmp_path/"modified.md"
    not_modified = tmp_path/"not_modified.md"
    added = tmp_path/"added.md"

    slipbox = sbox

    slipbox.conn.executescript(insert_file_script(modified, not_modified))

    added.touch()
    modified.touch()

    assert modified_notes(slipbox) == [modified]

def test_deleted_notes(tmp_path, sbox):
    """deleted_notes must exclude the following files:

    - Notes not in the database
    - Notes in the database that still exist in the file system
    """
    delete = tmp_path/"delete.md"
    dont_delete = tmp_path/"dont_delete.md"
    added = tmp_path/"not_in_db.md"

    slipbox = sbox

    slipbox.conn.executescript(insert_file_script(delete, dont_delete))

    dont_delete.touch()
    added.touch()

    assert deleted_notes(slipbox) == [delete]

def test_purge(tmp_path, sbox):
    """Input files must be purged from the database."""
    paths = []
    for prefix in "abcd":
        path = tmp_path/f"{prefix}.md"
        path.touch()
        paths.append(path)

    slipbox = sbox
    slipbox.conn.executescript(insert_file_script(*paths))

    slipbox.purge(paths[2:])

    result = slipbox.conn.execute("SELECT filename FROM Files")
    remaining = sorted(filename for filename, in result)
    assert len(remaining) == 2
    for path, filename in zip(paths, remaining):
        assert path.samefile(filename)

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_suggest_edits_backlinks(tmp_path, sbox):
    """slipbox.suggest_edits must include backlinks of outdated notes."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("# 0 A\n\nA.\n[B](#1 '0a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_c.touch()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [(1, "B", file_b)]

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_suggest_edits_aliases(tmp_path, sbox):
    """slipbox.suggest_edits must include alias owners of outdated notes."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("# 0 A\n\nA.\n[B](#1 '0a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_b.touch()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [(0, "A", file_a)]

@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_suggest_edits_exclude_deleted_notes(tmp_path, sbox):
    """slipbox.suggest_edits must exclude deleted notes."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '0a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_c.touch()
    file_a.unlink()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [(1, "B", file_b)]


@pytest.mark.skipif(not check_requirements(), reason="requires grep and pandoc")
def test_run(tmp_path, capsys, sbox):
    """There must be no suggestions when running for the first time."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '0a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.run()

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr
