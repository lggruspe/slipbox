"""Slipbox CLI."""

from climux import Cli, Command
from .app import (check_notes, generate_flashcards, main, show_info_wrapper,
                  initialize, new_note)


commands = [
    Command(main, alias="build"),
    Command(check_notes, alias="check"),
    Command(generate_flashcards, alias="flashcards"),
    Command(show_info_wrapper, alias="info"),
    Command(initialize, alias="init"),
    Command(new_note, alias="new"),
]
cli = Cli("slipbox", "Generate a static website from your notes.")

for command in commands:
    command.show_result = False
    cli.add(command)
