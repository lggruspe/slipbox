"""Sqlite database wrapper."""

from collections import namedtuple
from itertools import chain
import os.path
from pathlib import Path
import sqlite3
from typing import Iterable, List, Set

from .config import Config
from . import scan, page

Notes = namedtuple("Notes", "added modified deleted")

class Slipbox:
    """Slipbox main functions."""
    def __init__(self, config: Config = Config()):
        self.timestamp = 0.0
        self.config = config
        self.conn = sqlite3.connect(config.database)
        if config.database.exists():
            self.timestamp = os.path.getmtime(config.database)

        sql = Path(__file__).with_name("schema.sql").read_text()
        self.conn.executescript(sql)
        self.conn.commit()

    def close(self) -> None:
        """Close database connection."""
        self.conn.close()

    def __enter__(self) -> "Slipbox":
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None: # type: ignore
        self.close()

    def find_notes(self) -> Notes:
        """Return a named tuple containing lists of new, modified and deleted notes."""
        return Notes(
            added=added_notes(self),
            modified=modified_notes(self),
            deleted=deleted_notes(self),
        )

    def suggest_edits(self, notes: Notes) -> Set[Path]:
        """Suggest notes to edit based on the given set of notes."""
        outdated = lambda: chain(notes.modified, notes.deleted)
        filenames = lambda: ((str(path),) for path in outdated())

        sql = "SELECT owner FROM Aliases where ID in (?)"
        owners = self.conn.executemany(sql, filenames())
        sql = "SELECT src FROM Links WHERE dest in (?)"
        backlinks = self.conn.executemany(sql, filenames())

        suggestions = map(Path, chain(owners, backlinks))
        return set(suggestions).difference(notes.deleted)

    def purge(self, paths: Iterable[Path]) -> None:
        """Purge filenames from the database."""
        filenames = ((str(path),) for path in paths)
        cur = self.conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        cur.executemany("DELETE FROM Files WHERE filename IN (?)", filenames)

    def process(self, paths: Iterable[Path]) -> None:
        """Process input files."""
        options = self.config.content_options
        self_contained = self.config.convert_to_data_url
        scan.scan(self.conn, list(set(paths)), options, self_contained)

    def compile(self) -> None:
        """Compile processed HTML into final output."""
        page.generate_complete_html(self.conn, self.config.document_options)

    def run(self) -> None:
        """Run all steps needed to compile output."""
        notes = self.find_notes()
        # suggestions = self.suggest_edits(notes)
        self.purge(chain(notes.modified, notes.deleted))
        self.process(chain(notes.added, notes.modified))
        self.compile()
        # for note in suggestions:
        #     print(note)

def added_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of newly added notes."""
    paths = slipbox.config.paths
    patterns = slipbox.config.patterns
    added = scan.find_new_files(slipbox.conn, paths, patterns)
    return list(added)

def modified_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of notes modified since the last scan."""
    files = scan.fetch_files(slipbox.conn)
    modified = (p for p in files if scan.is_recently_modified(slipbox.timestamp, p))
    return list(modified)

def deleted_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of notes that have been deleted from the file system."""
    files = scan.fetch_files(slipbox.conn)
    deleted = (p for p in files if not p.exists())
    return list(deleted)
