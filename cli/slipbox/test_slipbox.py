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

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_suggest_edits_backlinks(files_abc, sbox):
    """slipbox.suggest_edits must include backlinks of outdated notes."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#1 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_c.touch()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [('1', "B", file_b)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_suggest_edits_aliases(files_abc, sbox):
    """slipbox.suggest_edits must include alias owners of outdated notes."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#1 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_b.touch()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [('0', "A", file_a)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_suggest_edits_exclude_deleted_notes(files_abc, sbox):
    """slipbox.suggest_edits must exclude deleted notes."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.process([file_a, file_b, file_c])

    file_c.touch()
    file_a.unlink()

    notes = slipbox.find_notes()
    suggestions = list(slipbox.suggest_edits(notes))
    assert suggestions == [('1', "B", file_b)]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_run(files_abc, capsys, sbox):
    """There must be no suggestions when running for the first time."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox
    slipbox.timestamp = time()

    slipbox.run()

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process(tmp_path, sbox):
    """Smoke test for slipbox.process."""
    input_file = tmp_path/"input.md"
    input_file.write_text("# 1 Test note\n\nHello, world!\n")
    assert not list(sbox.conn.execute("SELECT * FROM Html"))

    sbox.process([input_file])
    result = list(sbox.conn.execute("SELECT * FROM Sections"))
    # Check if the output HTML has sections.
    assert len(result) == 1

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_empty_file(tmp_path, sbox):
    """Scanned files that are empty shouldn't have entries in the database."""
    empty = tmp_path/"empty.md"
    empty.touch()
    sbox.process([empty])
    assert not list(sbox.conn.execute("SELECT * FROM Files"))
    assert not list(sbox.conn.execute("SELECT * FROM Notes"))
    assert not list(sbox.conn.execute("SELECT * FROM Tags"))
    assert not list(sbox.conn.execute("SELECT * FROM Links"))
    assert not list(sbox.conn.execute("SELECT * FROM Aliases"))
    assert not list(sbox.conn.execute("SELECT * FROM Sequences"))
    assert not list(sbox.conn.execute("SELECT * FROM Html"))
    assert not list(sbox.conn.execute("SELECT * FROM Sections"))
    assert not list(sbox.conn.execute("SELECT * FROM Bibliography"))
    assert not list(sbox.conn.execute("SELECT * FROM Citations"))

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_filenames(tmp_path, sbox):
    """Filenames must be scanned correctly."""
    markdown = tmp_path/"foo.md"
    skip = tmp_path/"bar.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    sbox.process([markdown])

    result = list(sbox.conn.execute("SELECT filename FROM Notes WHERE id = '0'"))
    assert len(result) == 1
    assert markdown.samefile(result[0][0])

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_filenames0(tmp_path, sbox):
    """Filenames must be scanned correctly."""
    markdown = tmp_path/"bar.md"
    skip = tmp_path/"foo.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT filename FROM Notes WHERE id = '0'"))
    assert len(result) == 1
    assert markdown.samefile(result[0][0])

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_non_level1_headers(tmp_path, sbox):
    """Only level 1 headers must be considered as note headers."""
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Valid note header

Foo.

## 1 Invalid note header

Bar.
""")
    sbox.process([markdown])
    result = [nid for nid, in sbox.conn.execute("SELECT id FROM Notes")]
    assert len(result) == 1
    assert result == ['0']

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_duplicate_existing_id(tmp_path, sbox, capsys):
    """slipbox.process must show a warning if a new note shares the ID of an
    existing note.

    The warning message must show the filenames of both notes.
    """
    file_a = tmp_path/"a.md"
    file_a.write_text("# 0 Existing note\n\nTest.\n")

    sbox.process([file_a])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [('0', "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

    file_b = tmp_path/"b.md"
    file_b.write_text("# 0 Duplicate note\n\nTest.\n")

    sbox.process([file_b])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [('0', "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
    assert str(file_a) in stderr
    assert str(file_b) in stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_duplicate_ids_in_a_file(tmp_path, capsys, sbox):
    """If there are duplicate IDs in a file, only the first one must be saved.

    slipbox.process must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 First note

Foo.

# 0 Duplicate

Bar.
""")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [('0', "First note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_missing_alias(tmp_path, capsys, sbox):
    """slipbox.process must show a warning if there's a gap in an alias sequence."""
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Bar](#1 '/a')
[Baz](#2 '/a1a')

# 1 Bar

Bar.

# 2 Baz

Baz.
""")
    sbox.process([markdown])
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_aliases(sbox, tmp_path):
    """Only slash aliases must be saved."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("""# 0 A

[B](#1 '0a')
[C](#2 '/b')
""")
    file_b.write_text("# 1 B\n\nB")
    file_c.write_text("# 2 C\n\nC")

    sbox.process([file_a, file_b, file_c])
    result = list(sbox.conn.execute("SELECT id, alias, owner FROM Aliases ORDER BY alias"))
    assert len(result) == 2
    assert result == [('0', '0', '0'), ('2', '0b', '0')]

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_empty_link_target(tmp_path, capsys, sbox):
    """slipbox.process must show a warning if there is a link with an empty target."""
    markdown = tmp_path/"test.md"
    markdown.write_text("# 0 Foo\n\n[Empty]().\n")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT * FROM Links"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_id_in_scientific_form(tmp_path, capsys, sbox):
    """Headers with non-integer IDs should be ignored."""
    markdown = tmp_path/"test.md"
    markdown.write_text("# 1e1 Invalid note ID\n\nTest.\n")
    sbox.process([markdown])

    result = list(sbox.conn.execute("SELECT * FROM Notes"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_non_text_titles(tmp_path, capsys, sbox):
    """Notes with non-text titles in the header must still be recognized."""
    file_a = tmp_path/"a.md"
    file_b = tmp_path/"b.md"
    file_c = tmp_path/"c.md"
    file_a.write_text("# 0 $1 + 1 = 2$\n\nTest.\n")
    file_b.write_text("# 1 [Note 0](#0)\n\nTest.\n")
    file_c.write_text("# 2 `print('Title')`\n\nTest.\n")

    sbox.process([file_a, file_b, file_c])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes ORDER BY id"))

    assert len(result) == 3
    assert result == [('0', "1 + 1 = 2"), ('1', "Note 0"), ('2', "print('Title')")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_duplicate_aliases(tmp_path, capsys, sbox):
    """If a note defines duplicate aliases, only the first one must be saved.

    slipbox.process must show a warning when this happens.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Foo

[Bar](#1 '/a')
[Baz](#2 '/a')

# 1 Bar

Bar.

# 2 Baz

Baz.
""")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT id FROM Aliases WHERE alias = '0a'"))
    assert len(result) == 1
    assert result == [('1',)]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
