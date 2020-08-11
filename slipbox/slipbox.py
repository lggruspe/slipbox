"""Sqlite database wrapper."""

from collections import namedtuple
from itertools import chain
import os.path
from pathlib import Path
import sqlite3
from typing import Iterable, Iterator, List, Tuple

from . import scan, page
from .config import Config
from .data import warning
from .utils import sqlite_string

Notes = namedtuple("Notes", "added modified deleted")

class Slipbox:
    """Slipbox main functions."""
    def __init__(self, config: Config = Config()):
        self.timestamp = 0.0
        self.config = config
        if config.database.exists():
            self.timestamp = os.path.getmtime(config.database)
        self.conn = sqlite3.connect(config.database)

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

    def suggest_edits(self, notes: Notes) -> Iterator[Tuple[int, str, Path]]:
        """Suggest notes to edit based on the given set of notes.

        The suggestion includes
        - notes that link to notes that have been modified/deleted
        - notes that define an alias for modified/deleted notes
        and excludes notes that have been deleted.
        """
        outdated = chain(notes.modified, notes.deleted)
        filenames = [sqlite_string(str(path)) for path in outdated]

        sql = """
            SELECT owner FROM Notes JOIN Aliases USING (id)
                WHERE filename IN ({})
        """.format(",".join(filenames))
        owners = self.conn.execute(sql)

        sql = """
            SELECT src FROM Notes JOIN Links ON id = dest
                WHERE filename IN ({})
        """.format(",".join(filenames))
        backlinks = self.conn.execute(sql)

        affected = (str(nid) for nid, in chain(owners, backlinks))

        sql = """
            SELECT id, title, filename FROM Notes
                WHERE id IN ({}) ORDER BY id
        """.format(",".join(affected))

        for nid, title, filename in self.conn.execute(sql):
            path = Path(filename)
            if path not in notes.deleted:
                yield nid, title, path

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
        suggestions = list(self.suggest_edits(notes))
        self.purge(chain(notes.modified, notes.deleted))
        self.process(chain(notes.added, notes.modified))
        self.compile()
        if suggestions:
            warning(
                "The notes below are related to notes that have recently been updated.",
                "You might want to review them for inconsistent links.",
                *(f"  {nid}. {title} in {str(path)!r}."
                  for nid, title, path in suggestions)
            )

def added_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of newly added notes."""
    paths = slipbox.config.paths
    patterns = slipbox.config.patterns
    added = scan.find_new_files(slipbox.conn, paths, patterns)
    return list(added)

def modified_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of notes modified since the last scan."""
    files = scan.fetch_files(slipbox.conn)
    return [p for p in files if scan.is_recently_modified(slipbox.timestamp, p)]

def deleted_notes(slipbox: Slipbox) -> List[Path]:
    """Return list of notes that have been deleted from the file system."""
    files = scan.fetch_files(slipbox.conn)
    return [p for p in files if not p.exists()]
