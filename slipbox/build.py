"""Site builder."""

from hashlib import sha256
from pathlib import Path
import typing as t

from . import generator
from .app import App, require_init
from .batch import group_by_file_extension
from .finder import find_notes
from .processor import process_batch


def find_outdated_notes(app: App, notes: t.Iterable[Path]) -> t.Iterable[Path]:
    """Outdated notes: notes in database whose hash have changed.

    NOTE Does not check if the contents of the files changed.
    """
    digests = {p: sha256(p.read_bytes()).hexdigest() for p in notes}
    outdated = []
    sql = "SELECT filename, hash FROM Files"
    for filename, _hash in app.database.execute(sql):
        path = app.root/filename
        if digests.get(path) != _hash:
            outdated.append(filename)
    return outdated


def find_new_notes(app: App, notes: t.Iterable[Path]) -> t.Iterable[Path]:
    """Find notes that are not yet in the database."""
    assert app.root is not None
    sql = "SELECT filename FROM Files"
    in_db = set(r[0] for r in app.database.execute(sql))
    for path in notes:
        filename = str(path.relative_to(app.root))
        if filename not in in_db:
            yield path


def compile_site(app: App) -> None:
    """Compile processed HTML into final output."""
    assert app.root is not None
    options = app.config.document_options
    output_directory = app.root/app.config.output_directory
    title = app.config.title
    generator.main(app.database, options, output_directory, title)


@require_init
def build(app: App) -> None:
    """Build website."""
    notes = list(find_notes(app))

    # Delete outdated notes
    outdated = find_outdated_notes(app, notes)
    cur = app.database.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    cur.executemany("DELETE FROM Files WHERE filename IN (?)",
                    ((filename,) for filename in outdated))
    app.database.commit()

    # Process new notes by batch
    new = list(find_new_notes(app, notes))
    for batch in group_by_file_extension(new):
        process_batch(app, batch)

    compile_site(app)


__all__ = ["build"]
