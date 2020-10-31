"""slipbox CLI commands."""

from pathlib import Path
import sys

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

def check_notes(dot: DotSlipbox) -> bool:
    """Check notes in slipbox.

    Returns false is errors are found.
    """
    with Slipbox(dot) as slipbox:
        format_note = lambda note: f"  {note[0]}. {note[1]} in {note[2]!r}."
        format_link = lambda x: f"  {x[0][0]}. {x[0][1]} in {x[0][2]!r} -> {x[1]}."
        invalid_links = check.invalid_links(slipbox)
        isolated_notes = check.isolated_notes(slipbox)
        unsourced_notes = check.unsourced_notes(slipbox)

        errors = [
            print_sequence("The following notes link to non-existent notes.",
                           map(format_link, invalid_links)),
            print_sequence("The following notes are not connected to other notes.",
                           map(format_note, isolated_notes)),
            print_sequence("The following notes have missing citations.",
                           map(format_note, unsourced_notes)),
        ]
        return not any(errors)

def generate_flashcards(dot: DotSlipbox, output: Path) -> None:
    """Generate flash cards from notes."""
    try:
        import genanki #type: ignore
    except ImportError:
        sys.exit("could not import genanki")
    model = genanki.Model(
        1635490798, # model ID
        "Note",
        fields=[
            {"name": "Question"},
            {"name": "Answer"},
        ],
        templates=[
            {
                "name": "Card",
                "qfmt": "<h1>{{Question}}</h1>",
                "afmt": "{{Answer}}",
            },
        ],
    )
    deck = genanki.Deck(1843743983, # deck ID
                        "Slipbox")
    with Slipbox(dot) as slipbox:
        sql = "SELECT title, html FROM Notes"
        for title, html in slipbox.conn.execute(sql):
            note = genanki.Note(model=model,
                                fields=[
                                    title,
                                    html.replace(' style="display:none"', "")
                                ])
            deck.add_note(note)
    genanki.Package(deck).write_to_file(output)
