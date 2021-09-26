"""Look for files that must be compiled."""

from pathlib import Path
import shlex

from . import utils


def build_command(input_: Path,
                  output: str,
                  basedir: Path,
                  options: str = "") -> str:
    """Construct a single pandoc command to run on input."""
    assert input_.exists()
    data = Path(__file__).parent/"data"
    lua_filter = shlex.quote(str((data/"filter.lua").resolve()))
    cmd = f"{utils.pandoc()} {options} -L{lua_filter} --section-divs " \
        f" -Mlink-citations:true --mathjax " \
        "--resource-path {} -o {} --extract-media=''".format(
            shlex.quote(str(basedir.resolve())),
            shlex.quote(output),
        )
    return cmd + ' ' + shlex.quote(str(input_.resolve()))
