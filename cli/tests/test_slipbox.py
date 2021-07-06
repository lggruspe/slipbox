"""Test slipbox.py."""

from pathlib import Path
import typing as t

import pytest
from slipbox.slipbox import Slipbox
from slipbox.utils import check_requirements, insert_files


def test_find_new_notes(tmp_path: Path, sbox: Slipbox) -> None:
    """find_new_notes must only return existing files that aren't yet in the
    database and match the input patterns (*.md by default).
    """
    present = tmp_path/"present.md"
    absent = tmp_path/"absent.md"
    directory = tmp_path/"directory"
    txt = tmp_path/"ignore.txt"
    present.touch()
    absent.touch()
    directory.mkdir()
    txt.touch()

    insert_files(sbox.conn, present, basedir=sbox.basedir)
    assert list(sbox.find_new_notes(sbox.find_notes())) == [absent]


def test_added_notes_pattern(tmp_path: Path, sbox: Slipbox) -> None:
    """Results in sbox.find_new_notes() must match the input pattern."""
    sbox.dot.patterns = ['*.md', '*.txt']
    directory = tmp_path/"directory"
    markdown = tmp_path/"input.md"
    txt = tmp_path/"input.txt"
    tex = tmp_path/"ignore.tex"
    directory.mkdir()
    markdown.touch()
    txt.touch()
    tex.touch()
    assert sorted(sbox.find_new_notes(sbox.find_notes())) == [markdown, txt]


def test_added_notes_in_db(tmp_path: Path, sbox: Slipbox) -> None:
    """Results in sbox.find_new_notes() must not already be in the database."""
    new = tmp_path/"new.md"
    skip = tmp_path/"skip.md"
    new.touch()
    skip.touch()
    insert_files(sbox.conn, skip, basedir=sbox.basedir)
    assert list(sbox.find_new_notes(sbox.find_notes())) == [new]


def test_added_notes_recursive(tmp_path: Path, sbox: Slipbox) -> None:
    """sbox.find_new_notes() must find files recursively."""
    directory = tmp_path/"directory"
    new = directory/"new.md"
    directory.mkdir()
    new.touch()
    assert list(sbox.find_new_notes(sbox.find_notes())) == [new]


def test_modified_notes(tmp_path: Path, sbox: Slipbox) -> None:
    """sbox.find_new_notes() must find modified notes after they are purged."""
    modified = tmp_path/"modified.md"
    not_modified = tmp_path/"not_modified.md"
    added = tmp_path/"added.md"

    modified.write_text("hello")
    not_modified.write_text("hello")

    insert_files(sbox.conn, modified, not_modified, basedir=sbox.basedir)

    not_modified.write_text("hello")    # not modified
    added.write_text("new note")
    modified.write_text("modified")
    sbox.purge()

    assert sorted(sbox.find_new_notes(sbox.find_notes())) == [added, modified]


def test_purge(sbox: Slipbox, files_abc: t.List[Path]) -> None:
    """Input files must be purged from the database."""
    a_md, b_md, c_md = files_abc
    insert_files(sbox.conn, a_md, b_md, c_md, basedir=sbox.basedir)
    a_md.write_text(a_md.read_text())
    b_md.unlink()
    c_md.write_text("edit")
    sbox.purge()
    result = sbox.conn.execute("SELECT filename FROM Files")
    remaining = sorted(filename for filename, in result)
    assert len(remaining) == 1


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_run(files_abc: t.List[Path],
             capsys: pytest.CaptureFixture[str],
             sbox: Slipbox,
             ) -> None:
    """There must be no suggestions when running for the first time."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    slipbox = sbox

    slipbox.run()

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process(tmp_path: Path, sbox: Slipbox) -> None:
    """Smoke test for slipbox.process."""
    input_file = tmp_path/"input.md"
    input_file.write_text("# 1 Test note\n\nHello, world!\n")
    assert not list(sbox.conn.execute(
        "SELECT * FROM Notes WHERE html IS NOT NULL"
    ))

    sbox.process([input_file])
    result = list(sbox.conn.execute(
        "SELECT * FROM Notes WHERE html IS NOT NULL"
    ))
    assert result


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_empty_file(tmp_path: Path, sbox: Slipbox) -> None:
    """Scanned files that are empty shouldn't have entries in the database."""
    empty = tmp_path/"empty.md"
    empty.touch()
    sbox.process([empty])
    assert not list(sbox.conn.execute("SELECT * FROM Files"))
    assert not list(sbox.conn.execute("SELECT * FROM Notes"))
    assert not list(sbox.conn.execute("SELECT * FROM Tags"))
    assert not list(sbox.conn.execute("SELECT * FROM Links"))
    assert not list(sbox.conn.execute("SELECT * FROM Bibliography"))
    assert not list(sbox.conn.execute("SELECT * FROM Citations"))


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_clusters_from_context(tmp_path: Path, sbox: Slipbox) -> None:
    """Check if clusters are stored in db."""
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Test

#test

[](#1).

# 1 Dest

Test.
""")
    sbox.process([markdown])
    result = sorted(sbox.conn.execute("SELECT tag, src, dest FROM Links"))
    assert result == sorted([('#test', 0, 0), ('#test', 0, 1)])


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_filenames(tmp_path: Path, sbox: Slipbox) -> None:
    """Filenames must be scanned correctly."""
    markdown = tmp_path/"foo.md"
    skip = tmp_path/"bar.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    sbox.process([markdown])

    result = list(sbox.conn.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(sbox.basedir/result[0][0])


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_filenames0(tmp_path: Path, sbox: Slipbox) -> None:
    """Filenames must be scanned correctly."""
    markdown = tmp_path/"bar.md"
    skip = tmp_path/"foo.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(sbox.basedir/result[0][0])


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_non_level1_headers(tmp_path: Path, sbox: Slipbox) -> None:
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
    assert result == [0]


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_duplicate_existing_id(tmp_path: Path,
                                            sbox: Slipbox,
                                            capsys: pytest.CaptureFixture[str],
                                            ) -> None:
    """slipbox.process must show a warning if a new note shares the ID of an
    existing note.

    The warning message must show the filenames of both notes.
    """
    file_a = tmp_path/"a.md"
    file_a.write_text("# 0 Existing note\n\nTest.\n")

    sbox.process([file_a])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

    file_b = tmp_path/"b.md"
    file_b.write_text("# 0 Duplicate note\n\nTest.\n")

    sbox.process([file_b])
    result = list(sbox.conn.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
    assert str(file_a.relative_to(sbox.basedir)) in stderr
    assert str(file_b.relative_to(sbox.basedir)) in stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_duplicate_ids_in_a_file(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
    sbox: Slipbox,
) -> None:
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
    assert result == [(0, "First note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_empty_link_target(tmp_path: Path,
                                        capsys: pytest.CaptureFixture[str],
                                        sbox: Slipbox,
                                        ) -> None:
    """slipbox.process must show a warning if there is a link with an empty
    target.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("# 0 Foo\n\n[Empty]().\n")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT * FROM Links"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_with_id_in_scientific_form(tmp_path: Path,
                                            capsys: pytest.CaptureFixture[str],
                                            sbox: Slipbox,
                                            ) -> None:
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
def test_process_with_non_text_titles(tmp_path: Path,
                                      capsys: pytest.CaptureFixture[str],
                                      sbox: Slipbox,
                                      ) -> None:
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
    assert result == [(0, "1 + 1 = 2"), (1, "Note 0"), (2, "print('Title')")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_tags_with_trailing_punctuation(
    tmp_path: Path,
    capsys: pytest.CaptureFixture[str],
    sbox: Slipbox,
) -> None:
    """If a hashtag has trailing invalid symbols, only the prefix must be
    saved.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("# 0 Test\n\n#tag.\n#tags.\n#0.\n")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT tag FROM Tags ORDER BY tag"))
    assert result == [("#0",), ("#tag",), ("#tags",)]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(), reason="requires pandoc")
def test_process_modify_non_notes(tmp_path: Path,
                                  capsys: pytest.CaptureFixture[str],
                                  sbox: Slipbox,
                                  ) -> None:
    """Modification filters must be applied on non-notes too.

    But they shouldn't be saved in the database.
    Expect modifications:

    - Links with an empty target should be turned into plain text.
    - Links with an empty text should use the target as the text,
      surrounded by [brackets].
    - Hashtags should be turned into links.
    """
    markdown = tmp_path/"test.md"
    markdown.write_text("""# 0 Note

Bye.

# Not a note

[Foo]()

[](Bar)

#Baz
""")
    sbox.process([markdown])
    result = list(sbox.conn.execute("SELECT id, title, filename FROM Notes"))
    assert result == [(0, 'Note', str(markdown.relative_to(sbox.basedir)))]

    html = ""
    sql = "SELECT html FROM Notes WHERE html IS NOT NULL"
    for section, in sbox.conn.execute(sql):
        assert isinstance(section, str)
        assert section
        html += section
    assert html

    assert "<p>Foo</p>" in html
    assert '<p> [<a href="Bar">Bar</a>]</p>' in html
    assert '<p><a href="#tags/Baz">#Baz</a></p>' in html

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr
