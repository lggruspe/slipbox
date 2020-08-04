"""Utils."""

import contextlib
import os
from pathlib import Path
import shlex
import shutil
import subprocess
import tempfile
from typing import Any, Iterable, Iterator

def pandoc() -> str:
    """Pandoc location."""
    return os.environ.get("PANDOC", "pandoc")

def grep() -> str:
    """Grep location."""
    return os.environ.get("GREP", "grep")

def check_requirements() -> bool:
    """Check if grep and pandoc are installed."""
    return bool(shutil.which(pandoc()) and shutil.which(grep()))

def sqlite_string(text: str) -> str:
    """Encode python string into sqlite string."""
    return "'{}'".format(text.replace("'", "''"))

def write_lines(filename: str, text: Iterable[str]) -> None:
    """Write text (iterable) to file."""
    with open(filename, "w") as file:
        for line in text:
            print(line, file=file)

@contextlib.contextmanager
def make_temporary_file(*args: Any, **kwargs: Any) -> Iterator[Path]:
    """Temporary file context manager that returns filename."""
    _, filename = tempfile.mkstemp(*args, **kwargs)
    path = Path(filename)
    yield path
    path.unlink(missing_ok=True)

def run_command(cmd: str, **kwargs: Any) -> subprocess.CompletedProcess:
    """Run command with environment variables in kwargs.

    Returns stdout and stderr output.
    """
    env = os.environ.copy()
    env.update(**kwargs)
    proc = subprocess.run(shlex.split(cmd), env=env, check=False,
                          capture_output=True)
    return proc
