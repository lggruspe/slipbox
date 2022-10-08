# pylint: disable=missing-docstring
"""Collects and formats error messages."""

import json
from pathlib import Path
import typing as t

import colorama  # type: ignore
from colorama import Fore, Style


colorama.init()


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


def red(text: str) -> str:
    """Color text red."""
    return t.cast(str, Fore.RED + Style.BRIGHT + text + Style.RESET_ALL)


def yellow(text: str) -> str:
    """Color text yellow."""
    return t.cast(str, Fore.YELLOW + Style.BRIGHT + text + Style.RESET_ALL)


def dim(text: str) -> str:
    """Dim text."""
    return t.cast(str, Style.DIM + text + Style.RESET_ALL)


def is_error(message: MessageSchema) -> bool:
    """Check if message describes an error."""
    return message["name"] in (
        "duplicate-note-id",
        "invalid-link",
    )


def format_line(note: Note) -> str:
    """Format line in ErrorFormatter output."""
    id_ = dim(f"#{note['id']}")
    title = note["title"]
    filename = dim(f"({note['filename']})")
    return f"  {id_} {title} {filename}"


def format_section(
    notes: t.Iterable[Note],
    header: str,
    footer: str = "",
) -> str:
    """Format section in ErrorFormatter output.

    If there are no notes, returns an empty string.
    """
    if not notes:
        return ""
    section = header.strip() + "\n\n"
    written = set()
    for note in notes:
        line = format_line(note) + "\n"
        if line in written:
            continue
        written.add(line)

        section += line

    section += "\n"
    if footer:
        section += f"  {footer.strip()}\n\n"
    return section


class ErrorFormatter:
    """Collects and formats error messages."""
    def __init__(self) -> None:
        self.messages: t.List[MessageSchema] = []

    def format(self) -> str:
        """Minimized output for all errors and warnings."""
        duplicate_note_ids: t.List[Note] = []
        empty_link_targets: t.List[Note] = []
        invalid_links: t.List[Note] = []
        isolated_notes: t.List[Note] = []
        missing_citations: t.List[Note] = []

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
            elif name == "invalid-link":
                invalid_links.append(
                    t.cast(InvalidLinkValue, value)["note"].copy(),
                )
            elif name == "isolated-note":
                isolated_notes.append(t.cast(Note, value).copy())
            elif name == "missing-citations":
                missing_citations.append(t.cast(Note, value).copy())

        result = (
            format_section(
                duplicate_note_ids,
                header=red("error") + ": Duplicate note ID",
            ) +
            format_section(
                empty_link_targets,
                header=yellow("warning") + ": Empty link target",
            ) +
            format_section(
                invalid_links,
                header=red("error") + ": Invalid link",
                footer="These notes link to non-existent notes.",
            ) +
            format_section(
                isolated_notes,
                header=yellow("warning") + ": Isolated note",
                footer="These notes are not reachable from other notes.",
            ) +
            format_section(
                missing_citations,
                header=yellow("warning") + ": Missing citations",
                footer="These notes do not cite sources.",
            )
        )

        has_errors = len(duplicate_note_ids + invalid_links) > 0
        if has_errors:
            result += "Found errors :(\n"
        return result

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
