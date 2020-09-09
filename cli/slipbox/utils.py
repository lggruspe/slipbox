"""Utils."""

import contextlib
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
import tempfile
from typing import Any, Iterator

def pandoc() -> str:
    """Pandoc location."""
    return os.environ.get("PANDOC", "pandoc")

def check_requirements() -> bool:
    """Check if pandoc is installed."""
    return bool(shutil.which(pandoc()))

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
