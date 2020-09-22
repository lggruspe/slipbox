"""slipbox CLI commands."""

from .initializer import DotSlipbox
from .slipbox import Slipbox

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
