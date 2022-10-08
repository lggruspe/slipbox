"""Test slipbox.py."""

from hashlib import sha256
from pathlib import Path
from sqlite3 import Connection
import typing as t

import pytest
from slipbox.app import App, startup
from slipbox.build import (
    build, delete_notes, find_notes, find_new_notes, find_outdated_notes,
    process_notes,
)
from slipbox.dependencies import check_requirements


def insert_files(con: Connection, *files: Path, basedir: Path) -> None:
    """Insert files into database."""
    sql = "INSERT INTO Files (filename, hash) VALUES (?, ?)"
    con.executemany(sql, (
        (
            str(p.relative_to(basedir)),
            sha256(p.read_bytes()).hexdigest()
        )
        for p in files
    ))


def is_quiet(capsys: pytest.CaptureFixture[str]) -> bool:
    """Check if there's no output in stdout or stderr."""
    stdout, stderr = capsys.readouterr()
    return not stdout and not stderr


def test_find_new_notes(app: App) -> None:
    """find_new_notes must only return existing files that aren't yet in the
    database and match the input patterns (*.md by default).
    """
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


def test_added_notes_pattern(app: App) -> None:
    """Results of find_new_notes must match the input pattern."""
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


def test_added_notes_in_db(app: App) -> None:
    """Results of find_new_notes must not already be in the database."""
    new = app.root/"new.md"
    skip = app.root/"skip.md"
    new.touch()
    skip.touch()
    insert_files(app.database, skip, basedir=app.root)

    new_notes = find_new_notes(app, find_notes(app))
    assert list(new_notes) == [new]


def test_added_notes_recursive(app: App) -> None:
    """find_new_notes must find files recursively."""
    directory = app.root/"directory"
    new = app.root/"new.md"
    directory.mkdir()
    new.touch()

    new_notes = find_new_notes(app, find_notes(app))
    assert list(new_notes) == [new]


def test_modified_notes(app: App) -> None:
    """find_new_notes must find modified notes after they are deleted from the
    database.
    """
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


def test_purge(app: App, files_abc: t.List[Path]) -> None:
    """Input files must be purged from the database."""
    a_md, b_md, c_md = files_abc
    insert_files(app.database, a_md, b_md, c_md, basedir=app.root)
    a_md.write_text(a_md.read_text())
    b_md.unlink()
    c_md.write_text("edit")
    delete_notes(app, find_outdated_notes(app, find_notes(app)))

    result = app.database.execute("SELECT filename FROM Files")
    remaining = sorted(filename for filename, in result)
    assert len(remaining) == 1


@pytest.mark.skipif(
    not check_requirements(startup({})),
    reason="missing requirements",
)
class TestsWithRequirements:
    """Tests with external requirements (e.g. pandoc, graphviz, etc.)."""
    def test_build_backup_database(self, app: App) -> None:
        """Backup database must be deleted after build."""
        build(app)
        backup = app.root/".slipbox"/"data.db.bak"
        assert not backup.exists()

    def test_run(
        self,
        files_abc: t.List[Path],
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """There must be no suggestions when running for the first time."""
        file_a, file_b, file_c = files_abc
        file_a.write_text("# 0 A\n\nA.\n[B](#2 '/a').\n")
        file_b.write_text("# 1 B\n\nB.\n[C](#2).\n")
        file_c.write_text("# 2 C\n\nC.\n")

        build(app)
        assert is_quiet(capsys)

    def test_process(self, app: App) -> None:
        """Smoke test for slipbox.process."""
        input_file = app.root/"input.md"
        input_file.write_text("# 1 Test note\n\nHello, world!\n")
        assert not list(app.database.execute(
            "SELECT * FROM Notes WHERE html IS NOT NULL"
        ))

        process_notes(app, [input_file])
        result = list(app.database.execute(
            "SELECT * FROM Notes WHERE html IS NOT NULL"
        ))
        assert result

    def test_process_empty_file(self, app: App) -> None:
        """Empty files shouldn't have entries in the database."""
        empty = app.root/"empty.md"
        empty.touch()
        process_notes(app, [empty])
        assert not list(app.database.execute("SELECT * FROM Files"))
        assert not list(app.database.execute("SELECT * FROM Notes"))
        assert not list(app.database.execute("SELECT * FROM Tags"))
        assert not list(app.database.execute("SELECT * FROM Links"))
        assert not list(app.database.execute("SELECT * FROM Bibliography"))
        assert not list(app.database.execute("SELECT * FROM Citations"))

    def test_process_clusters_from_context(
        self,
        app: App,
    ) -> None:
        """Check if clusters are stored in db."""
        markdown = app.root/"test.md"
        markdown.write_text("""# 0 Test

#test

[](#1).

# 1 Dest

Test.
""")
        process_notes(app, [markdown])
        result = sorted(app.database.execute("SELECT src, dest FROM Links"))
        assert result == sorted([(0, 1)])

        result = sorted(app.database.execute("SELECT tag, id FROM Tags"))
        assert result == sorted([("#test", 0)])

    def test_process_filenames(self, app: App) -> None:
        """Filenames must be scanned correctly."""
        markdown = app.root/"foo.md"
        skip = app.root/"bar.md"
        markdown.write_text("# 0 Note\n\nBody.\n")
        skip.write_text("# 0 Note\n\nBody.\n")
        process_notes(app, [markdown])

        sql = "SELECT filename FROM Notes WHERE id = 0"
        result = list(app.database.execute(sql))
        assert len(result) == 1
        assert markdown.samefile(app.root/result[0][0])

    def test_process_filenames0(self, app: App) -> None:
        """Filenames must be scanned correctly."""
        markdown = app.root/"bar.md"
        skip = app.root/"foo.md"
        markdown.write_text("# 0 Note\n\nBody.\n")
        skip.write_text("# 0 Note\n\nBody.\n")
        process_notes(app, [markdown])

        sql = "SELECT filename FROM Notes WHERE id = 0"
        result = list(app.database.execute(sql))
        assert len(result) == 1
        assert markdown.samefile(app.root/result[0][0])

    def test_process_non_level1_headers(self, app: App) -> None:
        """Only level 1 headers must be considered as note headers."""
        markdown = app.root/"test.md"
        markdown.write_text("""# 0 Valid note header

Foo.

## 1 Invalid note header

Bar.
""")
        process_notes(app, [markdown])
        result = [nid for nid, in app.database.execute("SELECT id FROM Notes")]
        assert len(result) == 1
        assert result == [0]

    def test_process_with_duplicate_existing_id(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """slipbox.process must show a warning if a new note shares the ID of
        an existing note.

        The warning message must show the filenames of both notes.
        """
        file_a = app.root/"a.md"
        file_a.write_text("# 0 Existing note\n\nTest.\n")

        process_notes(app, [file_a])
        result = list(app.database.execute("SELECT id, title FROM Notes"))
        assert len(result) == 1
        assert result == [(0, "Existing note")]

        assert is_quiet(capsys)

        file_b = app.root/"b.md"
        file_b.write_text("# 0 Duplicate note\n\nTest.\n")

        process_notes(app, [file_b])
        result = list(app.database.execute("SELECT id, title FROM Notes"))
        assert len(result) == 1
        assert result == [(0, "Existing note")]

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert stderr
        assert str(file_a.relative_to(app.root)) in stderr
        assert str(file_b.relative_to(app.root)) in stderr

    def test_build_with_duplicate_ids_in_a_file(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """If there are duplicate IDs in a file, save neither note.

        slipbox.build must show an error message when this happens,
        containing the note ID, the filename and the note titles.
        """
        Path("test.md").write_text("""# 0 First note

Foo.

# 0 Duplicate

Bar.
""", encoding="utf-8")
        with pytest.raises(SystemExit) as system_exit:
            build(app)

        assert system_exit.value.code != 0

        result = list(app.database.execute("SELECT id, title FROM Notes"))
        assert not result

        stdout, stderr = capsys.readouterr()
        assert not stdout

        assert "#0" in stderr
        assert "First note" in stderr
        assert "Duplicate" in stderr
        assert "test.md" in stderr

    def test_build_with_duplicate_ids_in_batch(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """If there are duplicate IDs in a batch, it should exit with error.

        It should also display an error message containing the filenames
        containing the duplicate IDs, and make sure that the database isn't
        modified.
        """
        Path("foo.md").write_text("# 0 Foo\n\nFoo.", encoding="utf-8")
        Path("bar.md").write_text("# 0 Bar\n\nBar.", encoding="utf-8")

        before = "\n".join(app.database.iterdump())

        with pytest.raises(SystemExit) as system_exit:
            build(app)

        after = "\n".join(app.database.iterdump())

        assert before == after
        assert system_exit.value.code != 0

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert "foo.md" in stderr
        assert "bar.md" in stderr
        assert "Foo" in stderr
        assert "Bar" in stderr
        assert "#0" in stderr

    def test_build_with_duplicate_ids_in_multiple_batches(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Similar to test_build_with_duplicate_ids_in_batch.

        This time, with different note formats.
        """
        Path("foo.rst").write_text("""
0 Foo
=====

Foo.
""", encoding="utf-8")
        Path("bar.md").write_text("# 0 Bar\n\nBar.", encoding="utf-8")

        before = "\n".join(app.database.iterdump())

        with pytest.raises(SystemExit) as system_exit:
            build(app)

        after = "\n".join(app.database.iterdump())

        assert before == after
        assert system_exit.value.code != 0

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert "foo.rst" in stderr
        assert "bar.md" in stderr
        assert "Foo" in stderr
        assert "Bar" in stderr
        assert "#0" in stderr

    def test_build_with_codeblock(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """CodeBlocks shouldn't crash metadata parser in filters."""
        Path("test.md").write_text("""# 0 Hello

```
print("Hello :)")
```

# 1 Bye

Bye-bye.
""")
        build(app)
        assert is_quiet(capsys)

    def test_build_with_empty_link_target(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """slipbox.build must show a warning if there is a link with an empty
        target.
        """
        Path("test.md").write_text("# 0 Foo\n\n[Empty]().\n", encoding="utf-8")
        build(app)

        result = list(app.database.execute("SELECT * FROM Links"))
        assert not result

        stdout, stderr = capsys.readouterr()
        assert not stdout
        assert "#0" in stderr
        assert "Foo" in stderr
        assert "test.md" in stderr

    def test_process_with_external_links(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """External links shouldn't be saved in the db."""
        markdown = app.root/"test.md"
        markdown.write_text("# 0 Test\n\n[Example](https://example.com)")
        process_notes(app, [markdown])

        result = list(app.database.execute("SELECT id, title FROM Notes"))
        assert (0, "Test") in result

        result = list(app.database.execute("SELECT * FROM Links"))
        assert not result

        assert is_quiet(capsys)

    def test_process_with_id_in_scientific_form(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """Headers with non-integer IDs should be ignored."""
        markdown = app.root/"test.md"
        markdown.write_text("# 1e1 Invalid note ID\n\nTest.\n")
        process_notes(app, [markdown])

        result = list(app.database.execute("SELECT * FROM Notes"))
        assert not result

        assert is_quiet(capsys)

    def test_process_with_non_text_titles(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """Notes with non-text titles in the header must still be recognized.
        """
        file_a = app.root/"a.md"
        file_b = app.root/"b.md"
        file_c = app.root/"c.md"
        file_a.write_text("# 0 $1 + 1 = 2$\n\nTest.\n")
        file_b.write_text("# 1 [Note 0](#0)\n\nTest.\n")
        file_c.write_text("# 2 `print('Title')`\n\nTest.\n")

        process_notes(app, [file_a, file_b, file_c])

        sql = "SELECT id, title FROM Notes ORDER BY id"
        result = list(app.database.execute(sql))

        assert result == [
            (0, "1 + 1 = 2"),
            (1, "Note 0"),
            (2, "print('Title')"),
        ]

        assert is_quiet(capsys)

    def test_process_tags_with_trailing_punctuation(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """If a hashtag has trailing invalid symbols, only the prefix must be
        saved.
        """
        markdown = app.root/"test.md"
        markdown.write_text("# 0 Test\n\n#tag.\n#tags.\n#0.\n")
        process_notes(app, [markdown])
        result = app.database.execute("SELECT tag FROM Tags ORDER BY tag")
        assert list(result) == [("#0",), ("#tag",), ("#tags",)]

        assert is_quiet(capsys)

    def test_process_rst(
        self,
        capsys: pytest.CaptureFixture[str],
        app: App,
    ) -> None:
        """Slipbox filters shouldn't raise metadata-related errors."""
        rst = app.root/"test.rst"
        rst.write_text("""
1 Foo
=====

Foo.

2 Bar
=====

Bar.""")

        process_notes(app, [rst])
        result = list(
            app.database.execute("SELECT id, title, filename FROM Notes")
        )

        assert result == [(1, "Foo", "test.rst"), (2, "Bar", "test.rst")]

        assert is_quiet(capsys)


@pytest.mark.skipif(
    not check_requirements(startup({})),
    reason="missing requirements",
)
class TestDirectionalLinks:
    """Test directional links (e.g. [foo](<#123))."""

    def write_test_md(self, app: App) -> None:
        """Write test note to test.md."""
        app.root.joinpath("test.md").write_text("""
# 0 Foo

[Bar](#1)

# 1 Bar

[Baz](>#2)

# 2 Baz

[Foo](<#0)
""")

    def test_process_with_directional_links(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Direction in prefix of link target should be removed."""
        self.write_test_md(app)
        build(app)
        assert is_quiet(capsys)

        sql = "SELECT html FROM Notes"
        notes = list(app.database.execute(sql))
        assert notes
        for html, in notes:
            assert "%3" not in html
            assert "<#" not in html
            assert ">#" not in html

    def test_process_direction_in_db(
        self,
        app: App,
        capsys: pytest.CaptureFixture[str],
    ) -> None:
        """Link "direction" should be stored in the database."""
        self.write_test_md(app)
        build(app)
        assert is_quiet(capsys)

        sql = "SELECT direction FROM Links WHERE src = ? AND dest = ?"
        cur = app.database.cursor()
        cur.execute(sql, (0, 1))
        assert cur.fetchone()[0] == ""

        cur.execute(sql, (1, 2))
        assert cur.fetchone()[0] == ">"

        cur.execute(sql, (2, 0))
        assert cur.fetchone()[0] == "<"
