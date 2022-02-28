"""Site builder."""

from hashlib import sha256
from pathlib import Path
import typing as t

from . import generator
from .app import App, require_init
from .batch import group_by_file_extension
from .processor import process_batch


def find_notes(app: App) -> t.Iterable[Path]:
    """Find notes in slipbox directory."""
    assert app.root and app.root.is_dir()

    include: t.List[str] = []
    exclude: t.List[str] = []
    for pattern, true in app.config.patterns.items():
        (include if true else exclude).append(pattern)

    for path in app.root.rglob("*"):
        if not path.is_file():
            continue
        if not any(path.match(pat) for pat in include):
            continue
        if any(path.match(pat) for pat in exclude):
            continue
        yield path


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


def process_notes(app: App, notes: t.Iterable[Path]) -> None:
    """Process new notes (save into database)."""
    new = find_new_notes(app, notes)
    for batch in group_by_file_extension(new):
        process_batch(app, batch)


def delete_notes(app: App, notes: t.Iterable[Path]) -> None:
    """Delete notes from database."""
    cur = app.database.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    cur.executemany("DELETE FROM Files WHERE filename IN (?)",
                    ((filename,) for filename in notes))
    app.database.commit()


@require_init
def build(app: App) -> None:
    """Build website."""
    notes = list(find_notes(app))
    outdated = find_outdated_notes(app, notes)
    delete_notes(app, outdated)
    process_notes(app, notes)
    compile_site(app)


__all__ = ["build", "process_notes"]
