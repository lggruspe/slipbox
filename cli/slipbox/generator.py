"""Generate site in output directory."""

from pathlib import Path
from shutil import rmtree
from sqlite3 import Connection
from typing import Callable

from .page import generate_complete_html as generate_index


data = Path(__file__).parent/"data"

Generator = Callable[[Path], None]


class OutputDirectory:
    """Represents output directory of generated site."""
    def __init__(self, path: Path):
        self.path = path

    def clear(self) -> None:
        """Clear contents of output directory."""
        assert not self.path.exists() or self.path.is_dir()
        rmtree(self.path, ignore_errors=True)
        self.path.mkdir()

    def generate(self, *args: Generator) -> None:
        """Run generators."""
        self.clear()
        for arg in args:
            arg(self.path)


class IndexGenerator:
    """Generates index.html."""
    def __init__(self, con: Connection, options: str, basedir: Path):
        self.con = con
        self.options = options
        self.basedir = basedir

    def run(self, out: Path) -> None:
        """Generate index.html inside output directory."""
        generate_index(self.con, self.options, self.basedir, out)


class JsGenerator:
    """Generates Javascript files: app.js."""
    def __init__(self, con: Connection):
        self.con = con

    def run(self, out: Path) -> None:
        """Generate app.js inside output directory."""
        print(self.con)
        app_js = out/"app.js"
        source = data/"frontend.js"
        app_js.write_text(source.read_text())
        raise NotImplementedError


def generate_css(out: Path) -> None:
    """Generates CSS files: style.css."""
    style_css = out/"style.css"
    source = data/"style.html"
    style_css.write_text(source.read_text())
