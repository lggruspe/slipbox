"""Check slipbox notes."""

from typing import Iterator, Tuple
from .slipbox import Slipbox
from .utils import print_sequence

_Note = Tuple[int, str, str]

def invalid_links(slipbox: Slipbox) -> Iterator[Tuple[_Note, int]]:
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

def isolated_notes(slipbox: Slipbox) -> Iterator[_Note]:
    """Generate isolated notes (untagged)."""
    yield from slipbox.conn.execute("""
        SELECT DISTINCT id, title, filename FROM Notes
        WHERE id NOT IN (
            SELECT src FROM Links UNION SELECT dest FROM Links
        )
    """)

def unsourced_notes(slipbox: Slipbox) -> Iterator[_Note]:
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
    format_note = lambda note: f"  {note[0]}. {note[1]} in {note[2]!r}."
    format_link = lambda x: f"  {x[0][0]}. {x[0][1]} in {x[0][2]!r} -> {x[1]}."
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
