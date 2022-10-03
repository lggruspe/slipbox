# pylint: disable=missing-docstring
"""Collects and formats error messages."""

import json
from pathlib import Path
import typing as t


class NoteInfo(t.TypedDict):
    title: str
    filename: str


class DuplicateNoteIDValue(t.TypedDict):
    id: int
    notes: t.List[NoteInfo]


class DuplicateNoteIDSchema(t.TypedDict):
    name: t.Literal["duplicate-note-id"]
    value: DuplicateNoteIDValue


class Note(NoteInfo):
    id: int


class EmptyTargetLinkSchema(t.TypedDict):
    name: t.Literal["empty-link-target"]
    value: Note


MessageSchema = t.Union[DuplicateNoteIDSchema, EmptyTargetLinkSchema]


def format_section(description: str, notes: t.Iterable[Note]) -> str:
    """Format section in ErrorFormatter output."""
    section = description.strip() + "\n"
    for note in notes:
        id_ = note["id"]
        title = note["title"]
        filename = note["filename"]
        section += f"  #{id_} {title} ({filename})\n"
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
            else:
                raise NotImplementedError("unsupported message name")

        return (
            format_section("error: Duplicate note ID", duplicate_note_ids)
            + format_section("warning: Empty link target", empty_link_targets)
        )

    def add_errors(self, path: Path) -> None:
        """Collect errors from json file in path."""
        messages = json.loads(path.read_text(encoding="utf-8"))
        self.messages.extend(messages)
