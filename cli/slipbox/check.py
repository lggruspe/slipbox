"""Check slipbox notes."""

from typing import Iterator, Tuple
from .slipbox import Slipbox

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
