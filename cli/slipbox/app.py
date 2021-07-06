"""slipbox CLI commands."""

from pathlib import Path
import sys
import typing as t

from .initializer import DotSlipbox, default_config
from .slipbox import Slipbox
from .tools import check


def show_info(slipbox: Slipbox, note_id: int) -> None:
    """Print metadata associated with note ID."""
    sql = "SELECT title, filename FROM Notes WHERE id = ?"
    cur = slipbox.conn.cursor()
    cur.execute(sql, (note_id,))
    note = cur.fetchone()
    if note is not None:
        print(note_id)
        print(note[0])
        print(note[1])


def show_info_wrapper(note_id: str) -> None:
    """Show information about note."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        return show_info(slipbox, int(note_id))


def main() -> None:
    """Compile notes into static page."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        slipbox.run()


def check_notes() -> None:
    """Check notes in slipbox for invalid links and isolated notes."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        if not check.check_notes(slipbox):
            sys.exit(65)


def initialize(directory: t.Optional[str] = None,
               /,
               content_options: t.Optional[str] = None,
               document_options: t.Optional[str] = None,
               output_directory: t.Optional[str] = None,
               title: str = "Slipbox") -> None:
    """Initialize notes directory."""
    parent = Path(directory) if directory else Path()
    parent.mkdir(parents=True, exist_ok=True)

    defaults = default_config()
    if not content_options:
        content_options = defaults.get("slipbox", "content_options")
    if not document_options:
        document_options = defaults.get("slipbox", "document_options")
    if not output_directory:
        output_directory = defaults.get("slipbox", "output_directory")

    DotSlipbox(parent, dict(content_options=content_options,
                            document_options=document_options,
                            output_directory=output_directory,
                            title=title))
    print(f"Initialized .slipbox in {parent.resolve()!s}.")


def has_gaps(sequence: t.Sequence[int]) -> bool:
    """Check if sequence has gaps.

    Assume sequence is an increasing sequence of non-negative integers with no
    duplicate entries.
    """
    return bool(sequence) and (sequence[-1] - sequence[0] >= len(sequence))


def find_available_id(sequence: t.Sequence[int]) -> int:
    """Return smallest non-negative integer not in the sequence."""
    if not sequence or sequence[0] > 0:
        return 0
    if not has_gaps(sequence):
        return sequence[-1] + 1
    while len(sequence) > 2:
        mid = len(sequence) // 2
        lower = sequence[:mid]
        boundary = sequence[mid-1:mid+1]
        upper = sequence[mid:]
        sequence = lower if has_gaps(lower) \
            else boundary if has_gaps(boundary) \
            else upper
    return sequence[0] + 1


def new_note(note_format: t.Optional[str] = None, /) -> None:
    """Get smallest available note ID for new note."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        rows = slipbox.conn.execute("SELECT id FROM Notes ORDER BY (id)")
        ids = [row[0] for row in rows]
    suggest = find_available_id(ids)
    if note_format == "markdown":
        print(f"# {suggest} New note")
    else:
        print(suggest)
