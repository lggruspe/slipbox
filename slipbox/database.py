"""Functions for interacting with sqlite3 database."""

from pathlib import Path
import re
from sqlite3 import Connection
import typing as t


def user_version(con: Connection) -> int:
    """Return database user_version."""
    cur = con.cursor()
    cur.execute("PRAGMA user_version")
    row = cur.fetchone()
    return 0 if not row else int(row[0])


class Schema(t.NamedTuple):
    """Schema object."""
    version: int
    source: str


def schemas() -> t.List[Schema]:
    """Return list of schemas sorted by version.

    Does not check if there are duplicate versions or if the file versions
    match the user version.
    """
    migrations = Path(__file__).with_name("migrations")
    pattern = re.compile(r"^(\d+)\..+\.sql$")
    scripts = []
    for path in migrations.glob("*.sql"):
        result = pattern.match(path.name)
        if result:
            scripts.append(Schema(int(result.group(1)), path.read_text()))

    scripts.sort()
    return scripts


def migrate(con: Connection) -> None:
    """Migrate to latest version of database.

    Does not roll back on error.
    """
    for version, source in schemas():
        if user_version(con) < version:
            con.executescript(source)
    con.commit()


__all__ = ["migrate"]
