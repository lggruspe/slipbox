"""Utils."""

import contextlib
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import sys
import tempfile
from typing import Any, Dict, Iterable, Iterator, Optional

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

def run_command(cmd: str,
                variables: Optional[Dict[str, str]] = None,
                **kwargs: Any) -> int:
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

def insert_file_script(*files: Path, basedir: Path) -> str:
    """Create SQL query string to insert into the Files table."""
    sql = "INSERT INTO Files (filename) VALUES ({})"
    filenames = (sqlite_string(str(p.relative_to(basedir))) for p in files)
    return sql.format("), (".join(filenames))

def print_sequence(header: str, sequence: Iterable[str]) -> bool:
    """Print header and sequence of items if sequence is not empty.

    Return bool to indicate that sequence is non-empty.
    """
    empty = True
    for item in sequence:
        if empty:
            empty = False
            print(header)
        print(item)
    if not empty:
        print()
    return not empty
