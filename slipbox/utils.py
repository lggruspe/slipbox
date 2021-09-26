"""Utils."""

import contextlib
from hashlib import sha256
import os
from pathlib import Path
import shlex
import shutil
from sqlite3 import Connection
import subprocess
import sys
import tempfile
import typing as t


def pandoc() -> str:
    """Pandoc location."""
    return os.environ.get("PANDOC", "pandoc")


def check_requirements() -> bool:
    """Check if pandoc is installed."""
    return bool(shutil.which(pandoc()))


@contextlib.contextmanager
def temporary_directory() -> t.Iterator[Path]:
    """Path to temporary directory."""
    with tempfile.TemporaryDirectory() as tempdir:
        yield Path(tempdir)


def run_command(cmd: str,
                variables: t.Optional[t.Dict[str, str]] = None,
                **kwargs: t.Any) -> int:
    """Run command with additional environment variables in variables.

    Output stdout and stderr, and return the error code.

    kwargs
    : Additional arguments to subprocess.run
    """
    env = os.environ.copy()
    if variables is not None:
        env.update(variables)
    proc = subprocess.run(shlex.split(cmd), env=env, check=False,
                          capture_output=True, **kwargs)
    if proc.stdout:
        print(proc.stdout.decode())
    if proc.stderr:
        print(proc.stderr.decode(), file=sys.stderr)
    return proc.returncode


def insert_files(con: Connection, *files: Path, basedir: Path) -> None:
    """Insert files into database."""
    sql = "INSERT INTO Files (filename, hash) VALUES (?, ?)"
    con.executemany(sql, (
        (
            str(p.relative_to(basedir)),
            sha256(p.read_bytes()).hexdigest()
        )
        for p in files
    ))
