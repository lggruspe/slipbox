"""Slipbox CLI."""

import sys
import typing as t
import uuid
from genbu import Genbu, Param, combinators as comb, usage
from .app import (check_notes, generate_flashcards, main, show_info_wrapper,
                  initialize, new_note)
from .discover_commands import discover_commands


def show_help_message(parser: Genbu) -> None:
    """Show help message for Genbu CLI."""
    print(usage(parser))
    sys.exit()


class GenbuWithHelp(Genbu):
    """Extended Genbu CLI with help options."""

    _help_dest = f"help {uuid.uuid4().hex}"

    def __init__(self, *args: t.Any, **kwargs: t.Any):
        param = Param(
            dest=GenbuWithHelp._help_dest,
            optargs=["-?", "-h", "--help"],
            description="Show help message and exit.",
            parser=comb.Emit(True),
        )
        kwargs["params"] = list(kwargs.get("params", [])) + ["...", param]
        super().__init__(*args, **kwargs)
        param.aggregator = lambda _: show_help_message(self)


def _does_nothing() -> None:
    """Does nothing."""


cli = GenbuWithHelp(
    _does_nothing,
    name="slipbox",
    description="Generate a static website from your notes.",
    subparsers=t.cast(t.List[Genbu], [
        GenbuWithHelp(main, name="build"),
        GenbuWithHelp(check_notes, name="check"),
        GenbuWithHelp(generate_flashcards, name="flashcards"),
        GenbuWithHelp(show_info_wrapper, name="info"),
        GenbuWithHelp(initialize, name="init"),
        GenbuWithHelp(new_note, name="new"),
    ]) + list(discover_commands()),
)
