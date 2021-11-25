"""Look for files that must be compiled."""

from pathlib import Path
import shlex

from . import utils

def build_command(input_: Path,
                  output: str,
                  basedir: Path,
                  pandoc_path: Path,
                  options: str = "") -> str:
    """Construct a single pandoc command to run on input."""
    assert input_.exists()
    data = Path(__file__).parent/"data"
    lua_filter = shlex.quote(str((data/"filter.lua").resolve()))
    print(list(data.glob('**/*')))

    cmd = f"{pandoc_path} {options} -L{lua_filter} --section-divs " \
        f" -Mlink-citations:true --mathjax " \
        "--resource-path {rp} -o {o} --extract-media=''".format(
            pandoc_path=shlex.quote(str(pandoc_path.resolve())),
            options=options,
            lua_filter=lua_filter,
            rp=shlex.quote(str(basedir.resolve())),
            o=shlex.quote(output),
        )
    return cmd + ' ' + shlex.quote(str(input_.resolve()))
