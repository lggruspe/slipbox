"""Look for files that must be compiled."""

from pathlib import Path
import shlex
from sqlite3 import Connection

from . import utils


def is_file_in_db(path: Path, conn: Connection) -> bool:
    """Check if file is recorded in the database."""
    cur = conn.cursor()
    sql = "SELECT filename FROM Files WHERE filename = ?"
    for _ in cur.execute(sql, (str(path),)):
        return True
    return False


def build_command(input_: Path,
                  output: str,
                  basedir: Path,
                  options: str = "") -> str:
    """Construct a single pandoc command to run on input."""
    assert input_.exists()
    data = Path(__file__).parent/"data"
    lua_filter = shlex.quote(str((data/"filter.lua").resolve()))
    cmd = f"{utils.pandoc()} {options} -L{lua_filter} --section-divs " \
        f" -Mlink-citations:true " \
        "--resource-path {} -o {} --extract-media=''".format(
            shlex.quote(str(basedir.resolve())),
            shlex.quote(output),
        )
    return cmd + ' ' + shlex.quote(str(input_.resolve()))
