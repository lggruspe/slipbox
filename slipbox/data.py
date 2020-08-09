"""Process CSV data."""

import csv
from pathlib import Path
from sqlite3 import Connection
from typing import Sequence, Type

def run_sql_on_csv(conn: Connection, path: Path, sql: str, types: Sequence[Type]) -> None:
    """Run SQl query on CSV data."""
    cur = conn.cursor()
    with open(path) as file:
        reader = csv.reader(file)
        for row in reader:
            args = [t(a) for t, a in zip(types, row)]
            cur.execute(sql, args)

def process_files(conn: Connection, path: Path) -> None:
    """Process Files data in path."""
    sql = "INSERT OR IGNORE INTO Files (filename) VALUES (?)"
    run_sql_on_csv(conn, path, sql, (str,))

def process_notes(conn: Connection, path: Path) -> None:
    """Process Notes data in path."""
    sql = "INSERT OR IGNORE INTO Notes (id, title, filename) VALUES (?, ?, ?)"
    run_sql_on_csv(conn, path, sql, (int, str, str))

def process_tags(conn: Connection, path: Path) -> None:
    """Process Tags data in path."""
    sql = "INSERT OR IGNORE INTO Tags (tag, id) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (str, int))

def process_links(conn: Connection, path: Path) -> None:
    """Process Links data in path."""
    sql = "INSERT OR IGNORE INTO Links (src, dest, annotation) VALUES (?, ?, ?)"
    run_sql_on_csv(conn, path, sql, (int, int, str))

def process_aliases(conn: Connection, path: Path) -> None:
    """Process Aliases data in path."""
    sql = "INSERT OR IGNORE INTO Aliases (id, alias, owner) VALUES (?, ?, ?)"
    run_sql_on_csv(conn, path, sql, (int, str, int))

def process_sequences(conn: Connection, path: Path) -> None:
    """Process Sequences data in path."""
    sql = "INSERT OR IGNORE INTO Sequences (prev, next) VALUES (?, ?)"
    run_sql_on_csv(conn, path, sql, (str, str))

def process_csvs(conn: Connection, basedir: Path) -> None:
    """Process CSV data in basedir."""
    process_files(conn, basedir/"files.csv")
    process_notes(conn, basedir/"notes.csv")
    process_tags(conn, basedir/"tags.csv")
    process_links(conn, basedir/"links.csv")
    process_aliases(conn, basedir/"aliases.csv")
    process_sequences(conn, basedir/"sequences.csv")
