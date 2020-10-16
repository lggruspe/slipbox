"""Sqlite database wrapper."""

from itertools import chain
from pathlib import Path
from time import time
from typing import Iterable, List, Tuple

from . import scan, page
from .initializer import DotSlipbox

class Slipbox:
    """Slipbox main functions."""
    def __init__(self, dot: DotSlipbox):
        self.conn = dot.database()
        self.dot = dot
        self.config = dot.config

    @property
    def basedir(self) -> Path:
        """Return base directory regardless of current working directory."""
        return self.dot.parent

    @property
    def timestamp(self) -> float:
        """Get timestamp from Meta table."""
        cur = self.conn.cursor()
        cur.execute("SELECT * FROM Meta WHERE key = 'timestamp'")
        _, value = cur.fetchone()
        return value

    @timestamp.setter
    def timestamp(self, value: float) -> None:
        """Set timestamp in Meta table."""
        self.conn.execute("UPDATE Meta SET value = ? WHERE key = 'timestamp'", (value,))
        self.conn.commit()

    def close(self) -> None:
        """Close database connection."""
        self.conn.close()

    def __enter__(self) -> "Slipbox":
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None: # type: ignore
        self.close()

    def find_new_notes(self) -> Iterable[Path]:
        """Yield files that are not yet in the database."""
        patterns = self.dot.patterns
        for path in self.basedir.rglob('*'):
            if path.is_file() and scan.has_valid_pattern(path, patterns) \
                    and not scan.is_file_in_db(path.relative_to(self.basedir), self.conn):
                yield path

    def purge(self) -> Tuple[List[Path], List[Path]]:
        """Purge outdated/missing files from database.

        Also delete old sections.
        """
        modified = []
        deleted = []
        sql = "SELECT filename FROM Files"
        timestamp = self.timestamp
        cur = self.conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        for filename, in cur.execute(sql):
            path = self.basedir/filename
            if not path.exists():
                deleted.append(filename)
            elif scan.is_recently_modified(timestamp, path):
                modified.append(filename)
        cur.executemany("DELETE FROM Files WHERE filename IN (?)",
                        ((filename,) for filename in chain(modified, deleted)))
        self.conn.commit()
        return modified, deleted

    def process(self, paths: Iterable[Path]) -> None:
        """Process input files."""
        inputs = list(set(paths))
        for batch in scan.group_by_file_extension(inputs):
            scan.process_batch(self.conn, list(batch), self.config, self.basedir)
        self.timestamp = time()

    def compile(self) -> None:
        """Compile processed HTML into final output."""
        options = self.config.get("slipbox", "document_options")
        page.generate_complete_html(self.conn, options, self.basedir)

    def run(self) -> None:
        """Run all steps needed to compile output."""
        self.purge()
        notes = self.find_new_notes()
        self.process(notes)
        self.compile()
