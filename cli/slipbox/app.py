"""slipbox CLI commands."""

from . import check
from .initializer import DotSlipbox
from .slipbox import Slipbox
from .utils import print_sequence

def show_info(dot: DotSlipbox, note_id: int) -> None:
    """Print metadata associated with note ID."""
    sql = "SELECT title, filename FROM Notes WHERE id = ?"
    with Slipbox(dot) as slipbox:
        cur = slipbox.conn.cursor()
        cur.execute(sql, (note_id,))
        note = cur.fetchone()
        if note is not None:
            print(note_id)
            print(note[0])
            print(note[1])

def main(dot: DotSlipbox) -> None:
    """Compile notes into static page."""
    with Slipbox(dot) as slipbox:
        slipbox.run()

def check_notes(dot: DotSlipbox) -> None:
    """Check notes in slipbox."""
    with Slipbox(dot) as slipbox:
        format_link = lambda x: f"  {x[0][0]}. {x[0][1]} in {x[0][2]!r} -> {x[1]}."
        invalid_links = check.invalid_links(slipbox)
        print_sequence("The following notes link to non-existent notes.",
                       map(format_link, invalid_links))
        invalid_clusters = check.invalid_clusters(slipbox)
        print_sequence("The following notes tag non-existent notes.",
                       map(format_link, invalid_clusters))

        format_note = lambda note: f"  {note[0]}. {note[1]} in {note[2]!r}."
        isolated_notes = check.isolated_notes(slipbox)
        print_sequence("The following notes are not connected to other notes.",
                       map(format_note, isolated_notes))
