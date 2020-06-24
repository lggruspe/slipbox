"""Utils."""

import contextlib
import os
import shlex
import subprocess
import tempfile

def get_contents(filename):
    """Get contents of given file."""
    with open(filename) as file:
        return file.read()

def sqlite_string(text):
    """Encode python string into sqlite string."""
    return "'{}'".format(text.replace("'", "''"))

def write_lines(filename, text):
    """Write text (iterable) to file."""
    with open(filename, "w") as file:
        for line in text:
            print(line, file=file)

@contextlib.contextmanager
def make_temporary_file(*args, **kwargs):
    """Temporary file context manager that returns filename."""
    _, filename = tempfile.mkstemp(*args, **kwargs)
    yield filename
    os.remove(filename)

def run_command(cmd, **kwargs):
    """Run command with environment variables in kwargs."""
    env = os.environ.copy()
    env.update(**kwargs)
    subprocess.run(shlex.split(cmd), env=env, check=False)
