# type: ignore
"""Test slipbox.py."""

from sys import version_info

import pytest

from .config import Config
from .slipbox import Slipbox, added_notes
from .utils import insert_file_script

@pytest.mark.skipif(version_info.minor < 8, reason="requires python3.8")
def test_added_notes_pattern(tmp_path):
    """added_notes must match the input pattern."""
    config = Config(database=tmp_path/"slipbox.db")
    config.database.unlink(missing_ok=True)
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
    config.database.unlink(missing_ok=True)
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
    config.database.unlink(missing_ok=True)
    slipbox = Slipbox(config)

    directory = tmp_path/"directory"
    new = directory/"new.md"
    directory.mkdir()
    new.touch()

    slipbox.config.paths = (tmp_path,)
    assert added_notes(slipbox) == [new]
