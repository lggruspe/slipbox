"""Check slipbox notes."""

import typing as t
from ..slipbox import Slipbox

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


def invalid_links(slipbox: Slipbox) -> t.Iterator[t.Tuple[_Note, int]]:
    """Generate notes that link to invalid ID."""
    sql = """
        SELECT DISTINCT id, title, filename, dest
        FROM Links JOIN Notes ON src = id
        WHERE dest NOT IN (
            SELECT id FROM Notes
        )
        ORDER BY id
    """
    for nid, title, filename, dest in slipbox.conn.execute(sql):
        yield (nid, title, filename), dest


def isolated_notes(slipbox: Slipbox) -> t.Iterator[_Note]:
    """Generate isolated notes (untagged)."""
    yield from slipbox.conn.execute("""
        SELECT DISTINCT id, title, filename FROM Notes
        WHERE id NOT IN (
            SELECT src FROM Links UNION SELECT dest FROM Links
        )
    """)


def unsourced_notes(slipbox: Slipbox) -> t.Iterator[_Note]:
    """Generate notes that need citations (only if there's a bibliography)."""
    if "--bibliography" in slipbox.config["slipbox"]["content_options"]:
        yield from slipbox.conn.execute("""
            SELECT DISTINCT id, title, filename FROM Notes
            WHERE id NOT IN (
                SELECT note FROM Citations
            )
        """)


def check_notes(slipbox: Slipbox) -> bool:
    """Check notes in slipbox.

    Returns false is errors are found.
    """
    def format_note(note: _Note) -> str:
        return f"  {note[0]}. {note[1]} in {note[2]!r}."

    def format_link(link: t.Tuple[_Note, int]) -> str:
        return f"  {link[0][0]}. {link[0][1]} in {link[0][2]!r} -> {link[1]}."

    _invalid_links = invalid_links(slipbox)
    _isolated_notes = isolated_notes(slipbox)
    _unsourced_notes = unsourced_notes(slipbox)

    errors = [
        print_sequence("The following notes link to non-existent notes.",
                       map(format_link, _invalid_links)),
        print_sequence("The following notes are not connected to other notes.",
                       map(format_note, _isolated_notes)),
        print_sequence("The following notes have missing citations.",
                       map(format_note, _unsourced_notes)),
    ]
    return not any(errors)
