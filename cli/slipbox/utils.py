"""Utils."""

import contextlib
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
import tempfile
from typing import Any, Iterator, Optional

def pandoc() -> str:
    """Pandoc location."""
    return os.environ.get("PANDOC", "pandoc")

def check_requirements() -> bool:
    """Check if pandoc is installed."""
    return bool(shutil.which(pandoc()))

def check_options(options: str) -> bool:
    """Check if options can be passed to pandoc."""
    return "--strip-comments" not in options

def check_database() -> Optional[Path]:
    """Check if slipbox database has been initialized.

    Return path if the database has been initialized,
    None if not.
    """
    database = Path(".slipbox")/"data.db"
    return database if database.exists() else None

def check_if_initialized() -> bool:
    """Check if .slipbox/ has been initialized."""
    return check_database() is not None

def sqlite_string(text: str) -> str:
    """Encode python string into sqlite string."""
    return "'{}'".format(text.replace("'", "''"))

@contextlib.contextmanager
def temporary_directory() -> Iterator[Path]:
    """Path to temporary directory."""
    with tempfile.TemporaryDirectory() as tempdir:
        yield Path(tempdir)

def run_command(cmd: str, **kwargs: Any) -> int:
    """Run command with environment variables in kwargs.

    Output stdout and stderr, and return the error code.
    """
    env = os.environ.copy()
    env.update(**kwargs)
    proc = subprocess.run(shlex.split(cmd), env=env, check=False,
                          capture_output=True)
    if proc.stdout:
        print(proc.stdout.decode())
    if proc.stderr:
        print(proc.stderr.decode(), file=sys.stderr)
    return proc.returncode

def insert_file_script(*files: Path) -> str:
    """Create SQL query string to insert into the Files table."""
    sql = "INSERT INTO Files (filename) VALUES ({})"
    filenames = (sqlite_string(str(p)) for p in files)
    return sql.format("), (".join(filenames))
