# type: ignore
"""Test slipbox.py."""

from .config import Config
from .slipbox import Slipbox, added_notes, modified_notes, deleted_notes
from .utils import insert_file_script

def test_added_notes_pattern(tmp_path):
    """added_notes must match the input pattern."""
    config = Config(database=tmp_path/"slipbox.db")
    slipbox = Slipbox(config)

    directory = tmp_path/"directory"
    markdown = tmp_path/"input.md"
    txt = tmp_path/"input.txt"
    tex = tmp_path/"ignore.tex"
    directory.mkdir()
    markdown.touch()
    txt.touch()
    tex.touch()

    slipbox.config.paths = (tmp_path,)
    slipbox.config.patterns = ('*.md', '*.txt')
    notes = added_notes(slipbox)
    assert sorted(notes) == [markdown, txt]

def test_added_notes_in_db(tmp_path):
    """added_notes must not already be in the database."""
    config = Config(database=tmp_path/"slipbox.db")
    slipbox = Slipbox(config)

    new = tmp_path/"new.md"
    skip = tmp_path/"skip.md"
    new.touch()
    skip.touch()

    slipbox.conn.executescript(insert_file_script(skip))

    slipbox.config.paths = (tmp_path,)
    assert added_notes(slipbox) == [new]

def test_added_notes_recursive(tmp_path):
    """added_notes must find files recursively."""
    config = Config(database=tmp_path/"slipbox.db")
    slipbox = Slipbox(config)

    directory = tmp_path/"directory"
    new = directory/"new.md"
    directory.mkdir()
    new.touch()

    slipbox.config.paths = (tmp_path,)
    assert added_notes(slipbox) == [new]

def test_slipbox_context_manager(tmp_path):
    """Test database timestamp."""
    config = Config(database=tmp_path/"slipbox.db")
    with Slipbox(config) as slipbox:
        assert slipbox.timestamp == 0.0
    with Slipbox(config) as slipbox:
        assert slipbox.timestamp != 0.0

def test_modified_notes(tmp_path):
    """modified_notes must exclude the following notes:

    - Notes that aren't in the database
    - Notes in the database that haven't been modified
    """
    modified = tmp_path/"modified.md"
    not_modified = tmp_path/"not_modified.md"
    added = tmp_path/"added.md"

    config = Config(database=tmp_path/"slipbox.db")
    slipbox = Slipbox(config)
    slipbox.config.paths = (tmp_path,)

    slipbox.conn.executescript(insert_file_script(modified, not_modified))

    added.touch()
    modified.touch()

    assert modified_notes(slipbox) == [modified]

def test_deleted_notes(tmp_path):
    """deleted_notes must exclude the following files:

    - Notes not in the database
    - Notes in the database that still exist in the file system
    """
    delete = tmp_path/"delete.md"
    dont_delete = tmp_path/"dont_delete.md"
    added = tmp_path/"not_in_db.md"

    config = Config(database=tmp_path/"slipbox.db")
    slipbox = Slipbox(config)
    slipbox.config.paths = (tmp_path,)

    slipbox.conn.executescript(insert_file_script(delete, dont_delete))

    dont_delete.touch()
    added.touch()

    assert deleted_notes(slipbox) == [delete]
