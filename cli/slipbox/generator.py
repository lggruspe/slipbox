"""Generate site in output directory."""

import json
from pathlib import Path
from shutil import rmtree
from sqlite3 import Connection
import typing as t

from .graph import (  # type: ignore
    create_graph,
    create_graph_data,
    get_cluster,
    get_components,
)
from .page import generate_complete_html as generate_index


data = Path(__file__).parent/"data"

Generator = t.Callable[[Path], None]


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

    def write(self, path: Path, graph: t.Any, layout: str = "fdp") -> None:  # noqa; # pylint: disable=no-self-use
        """Write graph JSON data to path."""
        path.write_text(json.dumps(create_graph_data(graph, layout)))

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
            graph_data = create_graph_data(subgraph, "dot")
            for note_id in component:
                path = out/"graph"/"note"/f"{note_id}.json"
                path.write_text(json.dumps(graph_data))


def main(con: Connection,
         options: str,
         out: Path,
         title: str = "Slipbox") -> None:
    """Generate all files."""
    OutputDirectory(out).generate(
        CytoscapeDataGenerator(con).run,
        ImagesGenerator(con).run,
        IndexGenerator(con, options, title).run,
        generate_css,
        generate_js,
    )
