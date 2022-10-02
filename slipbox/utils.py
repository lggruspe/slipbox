"""Utils."""

import contextlib
import os
from pathlib import Path
import shlex
import subprocess
import sys
import tempfile
import typing as t


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
    proc = subprocess.run(
        shlex.split(cmd),
        env=env,
        check=False,
        capture_output=True,
        **kwargs,
    )
    if proc.stdout:
        print(proc.stdout.decode())
    if proc.stderr:
        print(proc.stderr.decode(), file=sys.stderr)
    return proc.returncode


def show_error(verbosity: t.Literal["error", "warning"], message: str) -> None:
    """Print error message to stderr."""
    print(f"[{verbosity}]", message, file=sys.stderr)
