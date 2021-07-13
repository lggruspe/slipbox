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
    """Show note info."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        return show_info(slipbox, int(note_id))


def main() -> None:
    """Build website."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        slipbox.run()


def check_notes() -> None:
    """Check for isolated notes and invalid links."""
    with Slipbox(DotSlipbox.locate()) as slipbox:
        if not check.check_notes(slipbox):
            sys.exit(65)


def initialize(directory: t.Optional[str] = None,
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
