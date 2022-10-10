# pylint: disable=use-a-generator
"""Check slipbox notes."""

import typing as t

from .app import App
from .errors import (
    EmptyTargetLinkSchema,
    GraphCycleSchema,
    InvalidLinkValue,
    InvalidLinkSchema,
    IsolatedNoteSchema,
    MissingCitationsSchema,
    Note,
)
from .graph import create_graph, find_cycles


def check_empty_links(app: App) -> t.List[Note]:
    """Check for notes with empty links.

    Results are reflected in app.error_formatter.
    Returns list of notes with empty links.
    """
    notes = []
    sql = """
        SELECT DISTINCT id, title, filename
        FROM Links JOIN Notes ON src = id
        WHERE dest < 0
        ORDER BY id
    """
    for nid, title, filename in app.database.execute(sql):
        value: Note = dict(
            id=int(nid),
            title=title,
            filename=filename,
        )
        message: EmptyTargetLinkSchema = dict(
            name="empty-link-target",
            value=value,
        )
        app.error_formatter.add_error(message)
        notes.append(value)
    return notes


def check_graph_cycles(app: App) -> t.List[Note]:
    """Check for cycles in the notes graph.

    Results are reflected in app.error_formatter.
    Returns list of notes in the cycle.
    """
    cycle = []
    edges = find_cycles(create_graph(app.database))

    query = "SELECT id, title, filename FROM Notes WHERE id = ?"

    cur = app.database.cursor()
    for src, _ in edges:
        cur.execute(query, (src,))
        row = cur.fetchone()

        value: Note = dict(
            id=int(row[0]),
            title=row[1],
            filename=row[2],
        )
        message: GraphCycleSchema = dict(
            name="graph-cycle",
            value=value,
        )
        app.error_formatter.add_error(message)
        cycle.append(value)
    return sorted(cycle, key=lambda note: note["id"])


def check_invalid_links(app: App) -> t.List[InvalidLinkValue]:
    """Check for invalid links.

    Results are reflected in app.error_formatter.
    Returns list of invalid links.
    """
    # NOTE Ignores negative (empty) links
    sql = """
        SELECT DISTINCT id, title, filename, dest
        FROM Links JOIN Notes ON src = id
        WHERE dest >= 0 AND dest NOT IN (
            SELECT id FROM Notes
        )
        ORDER BY id
    """
    invalid_links = []
    for nid, title, filename, dest in app.database.execute(sql):
        value: InvalidLinkValue = dict(
            note=dict(
                id=int(nid),
                title=title,
                filename=filename,
            ),
            target=int(dest),
        )
        message: InvalidLinkSchema = dict(
            name="invalid-link",
            value=value,
        )
        app.error_formatter.add_error(message)
        invalid_links.append(value)
    return invalid_links


def check_isolated_notes(app: App) -> t.List[Note]:
    """Check for isolated notes.

    Results are reflected in app.error_formatter.
    Returns list of isolated notes.
    """
    isolated_notes = []
    sql = """
        SELECT DISTINCT id, title, filename FROM Notes
        WHERE id NOT IN (
            SELECT src FROM ValidLinks UNION SELECT dest FROM ValidLinks
        )
    """
    for nid, title, filename in app.database.execute(sql):
        value: Note = dict(
            id=int(nid),
            title=title,
            filename=filename,
        )
        message: IsolatedNoteSchema = dict(
            name="isolated-note",
            value=value,
        )
        app.error_formatter.add_error(message)
        isolated_notes.append(value)
    return isolated_notes


def check_unsourced_notes(app: App) -> t.List[Note]:
    """Check for notes with missing citations.

    This checker is only used if there's a bib file.
    Results are reflected in app.error_formatter.
    Returns list of unsourced notes.
    """
    if app.config.bibliography is None:
        return []

    unsourced_notes = []
    sql = """
        SELECT DISTINCT id, title, filename FROM Notes
        WHERE id NOT IN (
            SELECT note FROM Citations
        )
    """
    for nid, title, filename in app.database.execute(sql):
        value: Note = dict(
            id=int(nid),
            title=title,
            filename=filename,
        )
        message: MissingCitationsSchema = dict(
            name="missing-citations",
            value=value,
        )
        app.error_formatter.add_error(message)
        unsourced_notes.append(value)
    return unsourced_notes


def check_notes(app: App) -> bool:
    """Check notes in slipbox.

    Returns False is errors are found.
    """
    has_error = check_invalid_links(app)
    has_warning = False

    checkers = [
        check_empty_links,
        check_graph_cycles,
        check_isolated_notes,
        check_unsourced_notes,
    ]
    has_warning = any([check(app) for check in checkers])
    strict = app.args.get("strict", False)
    if has_error or has_warning:
        enabled = app.args.get("enable")
        disabled = app.args.get("disable")
        print(
            app.error_formatter.format(enabled, disabled, strict=strict),
            end="",
        )
    return not has_error and (not strict or not has_warning)
