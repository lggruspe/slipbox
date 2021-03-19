"""Look for files that must be compiled."""

from itertools import groupby
import fnmatch
import os
from pathlib import Path
import shlex
from sqlite3 import Connection
from typing import Iterable, Tuple, Union

from . import utils


def is_recently_modified(timestamp: float, path: Path) -> bool:
    """Check if file has been modified after the timestamp."""
    return path.exists() and os.path.getmtime(path) >= timestamp


def is_file_in_db(path: Path, conn: Connection) -> bool:
    """Check if file is recorded in the database."""
    cur = conn.cursor()
    sql = "SELECT filename FROM Files WHERE filename = ?"
    for _ in cur.execute(sql, (str(path),)):
        return True
    return False


def has_valid_pattern(path: Path,
                      patterns: Iterable[str],
                      basedir: Path) -> bool:
    """Check if path matches one of the patterns."""
    for pattern in patterns:
        relpath = str(path.relative_to(basedir.resolve()))
        if fnmatch.fnmatch(relpath, pattern):
            return True
    return False


def group_by_file_extension(files: Iterable[Path]) -> Iterable[Iterable[Path]]:
    """Generate an iterator for each file extension.

    Each file with no file extension is given its own iterator.
    """
    def key(filename: Union[str, Path]) -> Tuple[str, str]:
        root, ext = os.path.splitext(filename)
        return (ext, "") if ext else ("", root)
    groups = groupby(sorted(files, key=key), key=key)
    return map(lambda g: g[1], groups)


def build_command(input_: Path,
                  output: str,
                  basedir: Path,
                  options: str = "") -> str:
    """Construct a single pandoc command to run on input."""
    assert input_.exists()
    data_dir = shlex.quote(str(Path(__file__).parent.resolve()))
    cmd = f"{utils.pandoc()} {options} -Lzk.lua --section-divs " \
        f"--data-dir={data_dir} -Mlink-citations:true " \
        "--resource-path {} -o {} --extract-media=images".format(
            shlex.quote(str(basedir.resolve())),
            shlex.quote(output),
        )
    return cmd + ' ' + shlex.quote(str(input_.resolve()))
