"""Slipbox CLI."""

from climates import Climate
from .app import (check_notes, generate_flashcards, main, show_info_wrapper,
                  initialize, new_note)

cli = Climate("slipbox", "Generate a single-page HTML from your notes.")
cli.add_commands(
    build=main,
    check=check_notes,
    flashcards=generate_flashcards,
    info=show_info_wrapper,
    init=initialize,
    new=new_note,
)
