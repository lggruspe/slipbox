"""Process CSV data."""

import csv
from pathlib import Path
from sqlite3 import Connection, IntegrityError
import typing as t

from .utils import show_error


def run_sql_on_csv(conn: Connection,
                   path: Path,
                   sql: str,
                   types: t.Sequence[t.Type[t.Any]],
                   callback: t.Optional[t.Callable[..., t.Any]] = None
                   ) -> None:
    """Run SQl query on CSV data."""
    cur = conn.cursor()
    with open(path, encoding="utf-8") as file:
        reader = csv.reader(file)
        for row in reader:
            args = [t(a) for t, a in zip(types, row)]
            try:
                cur.execute(sql, args)
            except IntegrityError:
                if callback:
                    callback(*args)


def process_files(conn: Connection, path: Path) -> None:
    """Process Files data in path."""
    sql = "INSERT OR IGNORE INTO Files (filename, hash) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (str, str))


def process_notes(conn: Connection, path: Path) -> bool:
    """Process Notes data in path.

    Returns False on error.
    """
    is_ok = True

    def fix(nid: int, title: str, filename: str) -> None:
        nonlocal is_ok
        is_ok = False
        cur = conn.cursor()
        cur.execute("SELECT title, filename FROM Notes WHERE id = ?", (nid,))
        existing = cur.fetchone()
        message = f"""Duplicate note ID (#{nid}). See:
- {existing[0]} ({existing[1]})
- {title} ({filename})"""
        show_error("error", message)

    sql = "INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)"
    run_sql_on_csv(conn, path, sql, (int, str, str), fix)
    return is_ok


def process_tags(conn: Connection, path: Path) -> None:
    """Process Tags data in path."""
    sql = "INSERT OR IGNORE INTO Tags (tag, id) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (str, int))


def process_links(conn: Connection, path: Path) -> None:
    """Process Links data in path."""
    sql = "INSERT OR IGNORE INTO Links (src, dest, direction) VALUES (?, ?, ?)"
    run_sql_on_csv(conn, path, sql, (int, int, str))


def process_bibliography(conn: Connection, path: Path) -> None:
    """Process Bibliography data in path."""
    sql = "INSERT OR IGNORE INTO Bibliography (key, html) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (str, str))


def process_citations(conn: Connection, path: Path) -> None:
    """Process Citations data in path."""
    sql = "INSERT OR IGNORE INTO Citations (note, reference) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (int, str))


def process_images(conn: Connection, path: Path) -> None:
    """Process Images data in path."""
    sql = "INSERT OR IGNORE INTO Images (filename, binary) VALUES (?, ?)"
    cur = conn.cursor()
    basedir = path.parent
    with open(path, encoding="utf-8") as file:
        reader = csv.reader(file)
        for row in reader:
            filename = row[0]
            image = basedir/filename
            binary: bytes = b""
            try:
                binary = image.read_bytes()
            except FileNotFoundError:
                continue
            try:
                cur.execute(sql, (filename, binary))
            except IntegrityError:
                pass


def process_image_links(conn: Connection, path: Path) -> None:
    """Process ImageLinks data in path."""
    sql = "INSERT OR IGNORE INTO ImageLinks (note, image) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (int, str))


def process_csvs(conn: Connection, basedir: Path) -> bool:
    """Process CSV data in basedir.

    Returns False on error.
    """
    process_files(conn, basedir/"files.csv")
    if not process_notes(conn, basedir/"notes.csv"):
        return False
    process_tags(conn, basedir/"tags.csv")
    process_links(conn, basedir/"links.csv")
    process_images(conn, basedir/"images.csv")
    process_image_links(conn, basedir/"image_links.csv")
    process_bibliography(conn, basedir/"bibliography.csv")
    process_citations(conn, basedir/"citations.csv")
    return True
