"""Test slipbox.py."""

from pathlib import Path
import typing as t

import pytest
from slipbox.app import App, startup
from slipbox.build import build, delete_notes, find_notes, find_new_notes, find_outdated_notes, process_notes
from slipbox.dependencies import check_requirements
from slipbox.utils import insert_files


def test_find_new_notes(test_app_with_root: App) -> None:
    """find_new_notes must only return existing files that aren't yet in the
    database and match the input patterns (*.md by default).
    """
    app = test_app_with_root
    present = app.root/"present.md"
    absent = app.root/"absent.md"
    directory = app.root/"directory"
    txt = app.root/"ignore.txt"
    present.touch()
    absent.touch()
    directory.mkdir()
    txt.touch()

    insert_files(app.database, present, basedir=app.root)

    new_notes = find_new_notes(app, find_notes(app))
    assert list(new_notes) == [absent]


def test_added_notes_pattern(test_app_with_root: App) -> None:
    """Results of find_new_notes must match the input pattern."""
    app = test_app_with_root
    app.config.patterns = {"*.md": True, "*.txt": True}

    directory = app.root/"directory"
    markdown = app.root/"input.md"
    txt = app.root/"input.txt"
    tex = app.root/"ignore.tex"
    directory.mkdir()
    markdown.touch()
    txt.touch()
    tex.touch()

    new_notes = find_new_notes(app, find_notes(app))
    assert sorted(new_notes) == [markdown, txt]


def test_added_notes_in_db(test_app_with_root: App) -> None:
    """Results of find_new_notes must not already be in the database."""
    app = test_app_with_root
    new = app.root/"new.md"
    skip = app.root/"skip.md"
    new.touch()
    skip.touch()
    insert_files(app.database, skip, basedir=app.root)

    new_notes = find_new_notes(app, find_notes(app))
    assert list(new_notes) == [new]


def test_added_notes_recursive(test_app_with_root: App) -> None:
    """find_new_notes must find files recursively."""
    app = test_app_with_root
    directory = app.root/"directory"
    new = app.root/"new.md"
    directory.mkdir()
    new.touch()

    new_notes = find_new_notes(app, find_notes(app))
    assert list(new_notes) == [new]


def test_modified_notes(test_app_with_root: App) -> None:
    """find_new_notes must find modified notes after they are deleted from the database."""
    app = test_app_with_root
    modified = app.root/"modified.md"
    not_modified = app.root/"not_modified.md"
    added = app.root/"added.md"

    modified.write_text("hello")
    not_modified.write_text("hello")

    insert_files(app.database, modified, not_modified, basedir=app.root)

    not_modified.write_text("hello")    # not modified
    added.write_text("new note")
    modified.write_text("modified")

    delete_notes(app, find_outdated_notes(app, find_notes(app)))

    new_notes = find_new_notes(app, find_notes(app))
    assert sorted(new_notes) == [added, modified]


def test_purge(test_app_with_root: App, files_abc: t.List[Path]) -> None:
    """Input files must be purged from the database."""
    app = test_app_with_root

    a_md, b_md, c_md = files_abc
    insert_files(app.database, a_md, b_md, c_md, basedir=app.root)
    a_md.write_text(a_md.read_text())
    b_md.unlink()
    c_md.write_text("edit")
    delete_notes(app, find_outdated_notes(app, find_notes(app)))

    result = app.database.execute("SELECT filename FROM Files")
    remaining = sorted(filename for filename, in result)
    assert len(remaining) == 1


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_run(files_abc: t.List[Path],
             capsys: pytest.CaptureFixture[str],
             test_app_with_root: App,
             ) -> None:
    """There must be no suggestions when running for the first time."""
    file_a, file_b, file_c = files_abc
    file_a.write_text("# 0 A\n\nA.\n[B](#2 '/a').\n")
    file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
    file_c.write_text("# 2 C\n\nC.\n")

    build(test_app_with_root)
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process(test_app_with_root: App) -> None:
    """Smoke test for slipbox.process."""
    app = test_app_with_root
    input_file = app.root/"input.md"
    input_file.write_text("# 1 Test note\n\nHello, world!\n")
    assert not list(test_app_with_root.database.execute(
        "SELECT * FROM Notes WHERE html IS NOT NULL"
    ))

    process_notes(test_app_with_root, [input_file])
    result = list(test_app_with_root.database.execute(
        "SELECT * FROM Notes WHERE html IS NOT NULL"
    ))
    assert result


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_empty_file(test_app_with_root: App) -> None:
    """Scanned files that are empty shouldn't have entries in the database."""
    app = test_app_with_root
    empty = app.root/"empty.md"
    empty.touch()
    process_notes(test_app_with_root, [empty])
    assert not list(test_app_with_root.database.execute("SELECT * FROM Files"))
    assert not list(test_app_with_root.database.execute("SELECT * FROM Notes"))
    assert not list(test_app_with_root.database.execute("SELECT * FROM Tags"))
    assert not list(test_app_with_root.database.execute("SELECT * FROM Links"))
    assert not list(test_app_with_root.database.execute("SELECT * FROM Bibliography"))
    assert not list(test_app_with_root.database.execute("SELECT * FROM Citations"))


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_clusters_from_context(test_app_with_root: App) -> None:
    """Check if clusters are stored in db."""
    app = test_app_with_root
    markdown = app.root/"test.md"
    markdown.write_text("""# 0 Test

#test

[](#1).

# 1 Dest

Test.
""")
    process_notes(test_app_with_root, [markdown])
    result = sorted(test_app_with_root.database.execute("SELECT src, dest FROM Links"))
    assert result == sorted([(0, 1)])

    result = sorted(test_app_with_root.database.execute("SELECT tag, id FROM Tags"))
    assert result == sorted([("#test", 0)])


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_filenames(test_app_with_root: App) -> None:
    """Filenames must be scanned correctly."""
    app = test_app_with_root
    markdown = app.root/"foo.md"
    skip = app.root/"bar.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    process_notes(app, [markdown])

    result = list(test_app_with_root.database.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(test_app_with_root.root/result[0][0])


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_filenames0(test_app_with_root: App) -> None:
    """Filenames must be scanned correctly."""
    app = test_app_with_root
    markdown = app.root/"bar.md"
    skip = app.root/"foo.md"
    markdown.write_text("# 0 Note\n\nBody.\n")
    skip.write_text("# 0 Note\n\nBody.\n")
    process_notes(test_app_with_root, [markdown])
    result = list(test_app_with_root.database.execute("SELECT filename FROM Notes WHERE id = 0"))
    assert len(result) == 1
    assert markdown.samefile(test_app_with_root.root/result[0][0])


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_non_level1_headers(test_app_with_root: App) -> None:
    """Only level 1 headers must be considered as note headers."""
    app = test_app_with_root
    markdown = app.root/"test.md"
    markdown.write_text("""# 0 Valid note header

Foo.

## 1 Invalid note header

Bar.
""")
    process_notes(test_app_with_root, [markdown])
    result = [nid for nid, in test_app_with_root.database.execute("SELECT id FROM Notes")]
    assert len(result) == 1
    assert result == [0]


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_duplicate_existing_id(test_app_with_root: App,
                                            capsys: pytest.CaptureFixture[str],
                                            ) -> None:
    """slipbox.process must show a warning if a new note shares the ID of an
    existing note.

    The warning message must show the filenames of both notes.
    """
    app = test_app_with_root
    file_a = app.root/"a.md"
    file_a.write_text("# 0 Existing note\n\nTest.\n")

    process_notes(test_app_with_root, [file_a])
    result = list(test_app_with_root.database.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr

    file_b = test_app_with_root.root/"b.md"
    file_b.write_text("# 0 Duplicate note\n\nTest.\n")

    process_notes(test_app_with_root, [file_b])
    result = list(test_app_with_root.database.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "Existing note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
    assert str(file_a.relative_to(test_app_with_root.root)) in stderr
    assert str(file_b.relative_to(test_app_with_root.root)) in stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_duplicate_ids_in_a_file(
    capsys: pytest.CaptureFixture[str],
    test_app_with_root: App,
) -> None:
    """If there are duplicate IDs in a file, only the first one must be saved.

    slipbox.process must show a warning when this happens.
    """
    markdown = test_app_with_root.root/"test.md"
    markdown.write_text("""# 0 First note

Foo.

# 0 Duplicate

Bar.
""")
    process_notes(test_app_with_root, [markdown])
    result = list(test_app_with_root.database.execute("SELECT id, title FROM Notes"))
    assert len(result) == 1
    assert result == [(0, "First note")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_empty_link_target(capsys: pytest.CaptureFixture[str],
                                        test_app_with_root: App,
                                        ) -> None:
    """slipbox.process must show a warning if there is a link with an empty
    target.
    """
    markdown = test_app_with_root.root/"test.md"
    markdown.write_text("# 0 Foo\n\n[Empty]().\n")
    process_notes(test_app_with_root, [markdown])
    result = list(test_app_with_root.database.execute("SELECT * FROM Links"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_external_links(capsys: pytest.CaptureFixture[str],
                                     test_app_with_root: App,
                                     ) -> None:
    """External links shouldn't be saved in the db."""
    markdown = test_app_with_root.root/"test.md"
    markdown.write_text("# 0 Test\n\n[Example](https://example.com)")
    process_notes(test_app_with_root, [markdown])

    result = list(test_app_with_root.database.execute("SELECT id, title FROM Notes"))
    assert (0, "Test") in result

    result = list(test_app_with_root.database.execute("SELECT * FROM Links"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_id_in_scientific_form(capsys: pytest.CaptureFixture[str],
                                            test_app_with_root: App,
                                            ) -> None:
    """Headers with non-integer IDs should be ignored."""
    markdown = test_app_with_root.root/"test.md"
    markdown.write_text("# 1e1 Invalid note ID\n\nTest.\n")
    process_notes(test_app_with_root, [markdown])

    result = list(test_app_with_root.database.execute("SELECT * FROM Notes"))
    assert not result

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_with_non_text_titles(capsys: pytest.CaptureFixture[str],
                                      test_app_with_root: App,
                                      ) -> None:
    """Notes with non-text titles in the header must still be recognized."""
    file_a = test_app_with_root.root/"a.md"
    file_b = test_app_with_root.root/"b.md"
    file_c = test_app_with_root.root/"c.md"
    file_a.write_text("# 0 $1 + 1 = 2$\n\nTest.\n")
    file_b.write_text("# 1 [Note 0](#0)\n\nTest.\n")
    file_c.write_text("# 2 `print('Title')`\n\nTest.\n")

    process_notes(test_app_with_root, [file_a, file_b, file_c])
    result = list(test_app_with_root.database.execute("SELECT id, title FROM Notes ORDER BY id"))

    assert len(result) == 3
    assert result == [(0, "1 + 1 = 2"), (1, "Note 0"), (2, "print('Title')")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_tags_with_trailing_punctuation(
    capsys: pytest.CaptureFixture[str],
    test_app_with_root: App,
) -> None:
    """If a hashtag has trailing invalid symbols, only the prefix must be
    saved.
    """
    markdown = test_app_with_root.root/"test.md"
    markdown.write_text("# 0 Test\n\n#tag.\n#tags.\n#0.\n")
    process_notes(test_app_with_root, [markdown])
    result = list(test_app_with_root.database.execute("SELECT tag FROM Tags ORDER BY tag"))
    assert result == [("#0",), ("#tag",), ("#tags",)]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr


@pytest.mark.skipif(not check_requirements(startup({})), reason="requires pandoc")
def test_process_rst(capsys: pytest.CaptureFixture[str],
                     test_app_with_root: App,
                     ) -> None:
    """Slipbox should run without filters raising metadata-related errors."""
    app = test_app_with_root

    rst = app.root/"test.rst"
    rst.write_text("""
1 Foo
=====

Foo.

2 Bar
=====

Bar.""")

    process_notes(test_app_with_root, [rst])
    result = list(test_app_with_root.database.execute("SELECT id, title, filename FROM Notes"))

    assert result == [(1, "Foo", "test.rst"), (2, "Bar", "test.rst")]

    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr
