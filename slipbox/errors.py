# pylint: disable=missing-docstring
"""Collects and formats error messages."""

import json
from pathlib import Path
import typing as t


class Note(t.TypedDict):
    id: int
    title: str
    filename: str


class DuplicateNoteIDValue(t.TypedDict):
    id: int
    notes: t.List[Note]


class DuplicateNoteIDSchema(t.TypedDict):
    name: t.Literal["duplicate-note-id"]
    value: DuplicateNoteIDValue


class EmptyTargetLinkSchema(t.TypedDict):
    name: t.Literal["empty-link-target"]
    value: Note


MessageSchema = t.Union[DuplicateNoteIDSchema, EmptyTargetLinkSchema]


def format_section(description: str, notes: t.Iterable[Note]) -> str:
    """Format section in ErrorFormatter output.

    If there are no notes, returns an empty string.
    """
    if not notes:
        return ""
    section = description.strip() + "\n"
    written = set()
    for note in notes:
        id_ = note["id"]
        title = note["title"]
        filename = note["filename"]
        line = f"  #{id_} {title} ({filename})\n"

        if line in written:
            continue
        written.add(line)

        section += line
    return section + "\n"


class ErrorFormatter:
    """Collects and formats error messages."""
    def __init__(self) -> None:
        self.messages: t.List[MessageSchema] = []

    def format(self) -> str:
        """Minimized output for all errors and warnings."""
        duplicate_note_ids: t.List[Note] = []
        empty_link_targets: t.List[Note] = []

        for message in self.messages:
            name = message["name"]
            value = message["value"]

            if name == "duplicate-note-id":
                for note in t.cast(DuplicateNoteIDValue, value)["notes"]:
                    duplicate_note_ids.append(dict(
                        id=value["id"],
                        title=note["title"],
                        filename=note["filename"],
                    ))
            elif name == "empty-link-target":
                empty_link_targets.append(t.cast(Note, value).copy())
        return (
            format_section("error: Duplicate note ID", duplicate_note_ids)
            + format_section("warning: Empty link target", empty_link_targets)
        )

    def add_errors(self, path: Path) -> bool:
        """Collect errors from json file in path.

        Returns True if errors are found.
        """
        messages = json.loads(path.read_text(encoding="utf-8"))
        self.messages.extend(messages)
        return any(m["name"] == "duplicate-note-id" for m in messages)
