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
    def __init__(self, con: Connection, options: str, title: str = "Slipbox"):
        self.con = con
        self.options = options
        self.title = title

    def run(self, out: Path) -> None:
        """Generate index.html inside output directory."""
        generate_index(self.con, self.options, out, self.title)


def copy(source: Path, dest: Path) -> None:
    """Copy text from source to dest Path."""
    dest.write_text(source.read_text())


def generate_js(out: Path) -> None:
    """Generate app.js inside output directory."""
    copy(data/"app.js", out/"app.js")


def generate_css(out: Path) -> None:
    """Generates CSS files: style.css and base.css."""
    copy(data/"style.css", out/"style.css")
    copy(data/"base.css", out/"base.css")


class ImagesGenerator:
    """Copies images from database into output directory."""
    def __init__(self, con: Connection):
        self.con = con

    def run(self, out: Path) -> None:
        """Copy images into output directory."""
        images = out/"images"
        images.mkdir()
        sql = "SELECT filename, binary FROM Images"
        for filename, binary in self.con.execute(sql):
            image = images/filename
            image.write_bytes(binary)


def main(con: Connection,
         options: str,
         out: Path,
         title: str = "Slipbox") -> None:
    """Generate all files."""
    OutputDirectory(out).generate(
        IndexGenerator(con, options, title).run,
        ImagesGenerator(con).run,
        generate_js,
        generate_css,
    )
