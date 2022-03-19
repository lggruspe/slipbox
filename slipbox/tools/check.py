"""Check slipbox notes."""

import typing as t

from ..app import App

_Note = t.Tuple[int, str, str]


def print_sequence(header: str, sequence: t.Iterable[str]) -> bool:
    """Print header and sequence of items if sequence is not empty.

    Return bool to indicate that sequence is non-empty.
    """
    empty = True
    for item in sequence:
        if empty:
            empty = False
            print(header)
        print(item)
    if not empty:
        print()
    return not empty


def invalid_links(app: App) -> t.Iterator[t.Tuple[_Note, int]]:
    """Generate notes that link to invalid ID."""
    sql = """
        SELECT DISTINCT id, title, filename, dest
        FROM Links JOIN Notes ON src = id
        WHERE dest NOT IN (
            SELECT id FROM Notes
        )
        ORDER BY id
    """
    for nid, title, filename, dest in app.database.execute(sql):
        yield (nid, title, filename), dest


def isolated_notes(app: App) -> t.Iterator[_Note]:
    """Generate isolated notes."""
    yield from app.database.execute("""
        SELECT DISTINCT id, title, filename FROM Notes
        WHERE id NOT IN (
            SELECT src FROM ValidLinks UNION SELECT dest FROM ValidLinks
        )
    """)


def unsourced_notes(app: App) -> t.Iterator[_Note]:
    """Generate notes that need citations (only if there's a bibliography)."""
    if app.config.bibliography is not None:
        yield from app.database.execute("""
            SELECT DISTINCT id, title, filename FROM Notes
            WHERE id NOT IN (
                SELECT note FROM Citations
            )
        """)


def check_notes(app: App) -> bool:
    """Check notes in slipbox.

    Returns false is errors are found.
    """
    def format_note(note: _Note) -> str:
        return f"  {note[0]}. {note[1]} in {note[2]!r}."

    def format_link(link: t.Tuple[_Note, int]) -> str:
        return f"  {link[0][0]}. {link[0][1]} in {link[0][2]!r} -> {link[1]}."

    _invalid_links = invalid_links(app)
    _isolated_notes = isolated_notes(app)
    _unsourced_notes = unsourced_notes(app)

    errors = [
        print_sequence("The following notes link to non-existent notes.",
                       map(format_link, _invalid_links)),
        print_sequence("The following notes are not connected to other notes.",
                       map(format_note, _isolated_notes)),
        print_sequence("The following notes have missing citations.",
                       map(format_note, _unsourced_notes)),
    ]
    return not any(errors)
