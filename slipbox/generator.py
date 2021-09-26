"""Generate site in output directory."""

from contextlib import contextmanager
import json
from pathlib import Path
from shutil import move, rmtree
from sqlite3 import Connection
import typing as t

from .graph import (  # type: ignore
    create_graph,
    create_graph_data,
    get_cluster,
    get_components,
    get_note_titles,
)
from .page import generate_complete_html as generate_index
from .utils import temporary_directory


data = Path(__file__).parent/"data"

Generator = t.Callable[[Path], None]


def clear(directory: Path) -> None:
    """Clear contents of directory.

    Create directory if it doesn't exist.
    """
    directory.mkdir(exist_ok=True)
    for child in directory.iterdir():
        if child.is_dir():
            rmtree(child, ignore_errors=True)
        else:
            child.unlink()


@contextmanager
def output_directory_proxy(path: Path) -> t.Iterator[Path]:
    """Create proxy for output directory.

    Afterwards path is emptied and all contents of tempdir are moved into path.
    """
    assert not path.exists() or path.is_dir()
    with temporary_directory() as tempdir:
        yield tempdir
        clear(path)
        for child in tempdir.iterdir():
            move(str(child), str(path))


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
    """Generates style.css"""
    copy(data/"style.css", out/"style.css")


class ImagesGenerator:
    """Copies images from database into output directory."""
    def __init__(self, con: Connection):
        self.con = con

    def run(self, out: Path) -> None:
        """Copy images into output directory."""
        (out/"images").mkdir()
        sql = "SELECT filename, binary FROM Images"
        for filename, binary in self.con.execute(sql):
            image = out/filename
            image.write_bytes(binary)


class CytoscapeDataGenerator:
    """Generate JSONs for cytoscape.js."""
    def __init__(self, con: Connection):
        self.con = con
        self.graph = create_graph(con)

        self.titles = dict(get_note_titles(self.con))

    def write(self, path: Path, graph: t.Any, layout: str = "fdp") -> None:  # noqa; # pylint: disable=no-self-use
        """Write graph JSON data to path."""
        graph_data = create_graph_data(self.titles, graph, layout)
        path.write_text(json.dumps(graph_data))

    def run(self, out: Path) -> None:
        """Generate JSONs for cytoscape.js in out/graph."""
        (out/"graph").mkdir()
        layout = "dot" if self.graph.order() < 100 else "fdp"
        self.write(out/"graph"/"data.json", self.graph, layout)

        (out/"graph"/"tag").mkdir()
        for tag, in self.con.execute("SELECT DISTINCT tag FROM Tags"):
            path = out/"graph"/"tag"/f"{tag[1:]}.json"
            self.write(path, get_cluster(self.graph, tag), "dot")

        (out/"graph"/"note").mkdir()
        for component, subgraph in get_components(self.graph).items():
            graph_data = create_graph_data(self.titles, subgraph, "dot")
            for note_id in component:
                path = out/"graph"/"note"/f"{note_id}.json"
                path.write_text(json.dumps(graph_data))


def main(con: Connection,
         options: str,
         out: Path,
         title: str = "Slipbox") -> None:
    """Generate all files."""
    with output_directory_proxy(out) as tempdir:
        CytoscapeDataGenerator(con).run(tempdir)
        ImagesGenerator(con).run(tempdir)
        IndexGenerator(con, options, title).run(tempdir)
        generate_css(tempdir)
        generate_js(tempdir)
