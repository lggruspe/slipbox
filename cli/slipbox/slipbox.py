"""Sqlite database wrapper."""

from hashlib import sha256
from pathlib import Path
import typing as t

from . import generator
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
        sql = "SELECT filename FROM Files"
        in_db = set(r[0] for r in self.conn.execute(sql))
        for path in paths:
            filename = str(path.relative_to(self.basedir))
            if filename not in in_db:
                yield path

    def find_notes(self) -> t.Iterable[Path]:
        """Find notes in root."""
        root = self.basedir
        patterns = self.dot.patterns
        for path in root.rglob('*'):
            if path.is_file() and any(path.match(pat) for pat in patterns):
                yield path

    def purge(self) -> t.Iterable[Path]:
        """Purge outdated/missing files and sections from the database.

        Also returns all notes found.
        """
        digests = {
            p: sha256(p.read_bytes()).hexdigest() for p in self.find_notes()
        }
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
        return digests.keys()

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
        notes = self.find_new_notes(self.purge())
        self.process(notes)
        self.compile()
