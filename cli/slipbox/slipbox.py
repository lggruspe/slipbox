"""Sqlite database wrapper."""

from hashlib import sha256
from pathlib import Path
import typing as t

from . import generator, scan
from .batch import group_by_file_extension
from .initializer import DotSlipbox
from .processor import process_batch


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

    def close(self) -> None:
        """Close database connection."""
        self.conn.close()

    def __enter__(self) -> "Slipbox":
        return self

    def __exit__(self, exc_type, exc_value, traceback) -> None:  # type: ignore
        self.close()

    def find_new_notes(self, paths: t.Iterable[Path]) -> t.Iterable[Path]:
        """Yield files that are not yet in the database."""
        is_present = scan.is_file_in_db
        for path in paths:
            if not is_present(path.relative_to(self.basedir), self.conn):
                yield path

    def find_notes(self) -> t.Dict[Path, str]:
        """Find notes in root with corresponding hash."""
        digests = {}
        root = self.basedir
        patterns = self.dot.patterns
        for path in root.rglob('*'):
            if path.is_file() and any(path.match(pat) for pat in patterns):
                digests[path] = sha256(path.read_bytes()).hexdigest()
        return digests

    def purge(self) -> t.Dict[Path, str]:
        """Purge outdated/missing files and sections from the database.

        Also returns all notes found.
        """
        digests = self.find_notes()

        outdated = []
        cur = self.conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        for filename, _hash in cur.execute("SELECT filename, hash FROM Files"):
            path = self.basedir/filename
            if digests.get(path) != _hash:
                outdated.append(filename)
        cur.executemany("DELETE FROM Files WHERE filename IN (?)",
                        ((filename,) for filename in outdated))
        self.conn.commit()
        return digests

    def process(self, paths: t.Iterable[Path]) -> None:
        """Process input files."""
        inputs = list(paths)
        for batch in group_by_file_extension(inputs):
            process_batch(self.conn, batch, self.config, self.basedir)

    def compile(self) -> None:
        """Compile processed HTML into final output."""
        options = self.config.get("slipbox", "document_options")
        output_directory = self.basedir/self.config.get("slipbox",
                                                        "output_directory")
        title = self.config.get("slipbox", "title")
        generator.main(self.conn, options, output_directory, title)

    def run(self) -> None:
        """Run all steps needed to compile output."""
        notes = self.find_new_notes(self.purge().keys())
        self.process(notes)
        self.compile()
