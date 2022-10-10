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


def bright(text: str) -> str:
    """Brighten text."""
    return t.cast(str, Style.BRIGHT + text + Style.RESET_ALL)


def dim(text: str) -> str:
    """Dim text."""
    return t.cast(str, Style.DIM + text + Style.RESET_ALL)


def is_error(message: MessageSchema) -> bool:
    """Check if message describes an error."""
    return message["name"] in (
        "duplicate-note-id",
        "invalid-link",
    )


def format_line(note: Note, info: str = "") -> str:
    """Format line in ErrorFormatter output.

    info: Optional info text to include.
    """
    id_ = dim(f"#{note['id']}")
    title = note["title"]
    filename = dim(f"({note['filename']})")

    result = f"  {id_} {title} {filename}"
    if info:
        result += f"\n    {info}"
    return result


def format_section(
    notes: t.Iterable[Note],
    header: str,
    footer: str = "",
    info: t.Optional[t.Dict[int, str]] = None,
) -> str:
    """Format section in ErrorFormatter output.

    If there are no notes, returns an empty string.
    """
    if not notes:
        return ""

    if info is None:
        info = {}

    section = header.strip() + "\n\n"
    written = set()
    for note in notes:
        id_ = note["id"]
        line = format_line(note, info=info.get(id_, "")) + "\n"
        if line in written:
            continue
        written.add(line)

        section += line

    section += "\n"
    if footer:
        section += f"  {footer.strip()}\n\n"
    return section


def resolve_checkers(
    enabled: t.Optional[str],
    disabled: t.Optional[str],
) -> t.Set[str]:
    """Determine set of checkers to use."""
    if enabled is None and disabled is None:
        # use default checkers.
        return {
            "empty-link-target",
            "isolated-note",
            "missing-citations",
        }
    return set((enabled or "").split(",")) - set((disabled or "").split(","))


class ErrorFormatter:
    """Collects and formats error messages."""
    def __init__(self) -> None:
        self.messages: t.List[MessageSchema] = []

    def format(
        self,
        enabled: t.Optional[str] = None,
        disabled: t.Optional[str] = None,
    ) -> str:
        """Minimized output for all errors and warnings."""
        checkers = resolve_checkers(enabled, disabled)
        notes: t.Dict[str, t.List[Note]] = {
            "duplicate-note-id": [],
            "empty-link-target": [],
            "invalid-link": [],
            "isolated-note": [],
            "missing-citations": [],
        }

        invalid_link_targets: t.Dict[int, t.List[int]] = {}

        for message in self.messages:
            name = message["name"]
            value = message["value"]

            if name == "duplicate-note-id":
                value = t.cast(DuplicateNoteIDValue, value)
                for note in value["notes"]:
                    notes[name].append(dict(
                        id=value["id"],
                        title=note["title"],
                        filename=note["filename"],
                    ))
            elif name == "empty-link-target":
                notes[name].append(t.cast(Note, value).copy())
            elif name == "invalid-link":
                value = t.cast(InvalidLinkValue, value)
                note = value["note"].copy()
                notes[name].append(note)
                invalid_link_targets.setdefault(int(note["id"]), []).append(
                    value["target"],
                )
            elif name == "isolated-note":
                notes[name].append(t.cast(Note, value).copy())
            elif name == "missing-citations":
                notes[name].append(t.cast(Note, value).copy())

        invalid_link_info = {}
        for id_, targets in invalid_link_targets.items():
            invalid_link_info[id_] = "-> " + " ".join(
                bright(f"#{target}") for target in targets
            )
        result = (
            format_section(
                notes["duplicate-note-id"],
                header=red("error") + ": Duplicate note ID",
            ) +
            format_section(
                notes["invalid-link"],
                header=red("error") + ": Invalid link",
                footer="These notes link to non-existent notes.",
                info=invalid_link_info,
            )
        )

        if "empty-link-target" in checkers:
            result += format_section(
                notes["empty-link-target"],
                header=yellow("warning") + ": Empty link target",
            )
        if "isolated-note" in checkers:
            result += format_section(
                notes["isolated-note"],
                header=yellow("warning") + ": Isolated note",
                footer="These notes are not reachable from other notes.",
            )
        if "missing-citations" in checkers:
            result += format_section(
                notes["missing-citations"],
                header=yellow("warning") + ": Missing citations",
                footer="These notes do not cite sources.",
            )

        has_errors = (
            bool(notes["duplicate-note-id"])
            or bool(notes["invalid-link"])
        )
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
