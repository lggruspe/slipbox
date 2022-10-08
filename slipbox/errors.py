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


class InvalidLinkValue(t.TypedDict):
    note: Note
    target: int


class InvalidLinkSchema(t.TypedDict):
    """Note links to non-existent note."""
    name: t.Literal["invalid-link"]
    value: InvalidLinkValue


class IsolatedNoteSchema(t.TypedDict):
    """Note is not reachable from other notes."""
    name: t.Literal["isolated-note"]
    value: Note


class MissingCitationsSchema(t.TypedDict):
    name: t.Literal["missing-citations"]
    value: Note


MessageSchema = t.Union[
    DuplicateNoteIDSchema,
    EmptyTargetLinkSchema,
    InvalidLinkSchema,
    IsolatedNoteSchema,
    MissingCitationsSchema,
]


def is_error(message: MessageSchema) -> bool:
    """Check if message describes an error."""
    return message["name"] in (
        "duplicate-note-id",
        "invalid-link",
    )


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
                value = t.cast(DuplicateNoteIDValue, value)
                for note in value["notes"]:
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

    def add_error(self, message: MessageSchema) -> bool:
        """Add warning/error message.

        Returns True if it's an error.
        """
        self.messages.append(message)
        return is_error(message)

    def add_errors(self, path: Path) -> bool:
        """Collect errors from json file in path.

        Returns True if errors are found.
        """
        messages = json.loads(path.read_text(encoding="utf-8"))
        self.messages.extend(messages)
        return any(is_error(m) for m in messages)
