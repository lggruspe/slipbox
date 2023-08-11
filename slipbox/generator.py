"""Generate site in output directory."""

from contextlib import contextmanager
import json
from pathlib import Path
from shutil import copytree, move, rmtree
from sqlite3 import Connection
import typing as t

from .app import App
from .graph import (
    create_graph_data,
    create_note_graph,
    create_plain_graph_data,
    create_reference_graph,
    create_tag_graph,
    get_reference_cluster,
    get_tag_cluster,
    get_components,
)
from .page import generate_index
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
    def __init__(self, app: App):
        self.app = app

    def run(self, out: Path) -> None:
        """Generate index.html inside output directory."""
        generate_index(self.app, out)


def copy(source: Path, dest: Path) -> None:
    """Copy text from source to dest Path."""
    dest.write_bytes(source.read_bytes())


def generate_js(out: Path) -> None:
    """Copy slipbox.js inside output directory."""
    copy(data/"slipbox.js", out/"slipbox.js")
    copy(data/"slipbox.js.map", out/"slipbox.js.map")


def generate_css(out: Path) -> None:
    """Copy slipbox.css into output directory."""
    copy(data/"slipbox.css", out/"slipbox.css")
    copy(data/"slipbox.css.map", out/"slipbox.css.map")


def generate_favicons(out: Path) -> None:
    """Copy favicons."""
    favicons = Path(__file__).parent/"favicons"
    for path in favicons.iterdir():
        copy(path, out/path.name)


def copy_boxicons(out: Path) -> None:
    """Copy boxicons svgs."""
    copytree(data/"svg", out/"assets"/"boxicons"/"svg")


def copy_mathjax(out: Path) -> None:
    """Copy mathjax files."""
    copytree(data/"es5", out/"es5")


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
        self.graph = create_note_graph(con)

    def write(self, path: Path, data: t.Dict[str, t.Any]) -> None:
        """Write graph data (in cytoscape format) to path."""
        path.write_text(json.dumps(data), encoding="utf-8")

    def run(self, out: Path) -> None:
        """Generate JSONs for cytoscape.js in out/graph."""
        (out/"graph").mkdir()
        data = create_graph_data(self.con, self.graph)
        self.write(out/"graph"/"notes.json", data)

        self.write(
            out/"graph"/"refs.json",
            create_plain_graph_data(create_reference_graph(self.con)),
        )
        self.write(
            out/"graph"/"tags.json",
            create_plain_graph_data(create_tag_graph(self.con)),
        )

        (out/"graph"/"ref").mkdir()
        for ref, in self.con.execute("SELECT key FROM Bibliography"):
            path = out/"graph"/"ref"/f"{ref[4:]}.json"
            subgraph = get_reference_cluster(self.graph, ref)
            data = create_graph_data(self.con, subgraph)
            self.write(path, data)

        (out/"graph"/"tag").mkdir()
        for tag, in self.con.execute("SELECT DISTINCT tag FROM Tags"):
            path = out/"graph"/"tag"/f"{tag[1:]}.json"
            subgraph = get_tag_cluster(self.graph, tag)
            data = create_graph_data(self.con, subgraph)
            self.write(path, data)

        (out/"graph"/"note").mkdir()
        for component, subgraph in get_components(self.graph).items():
            data = create_graph_data(self.con, subgraph)
            for note_id in component:
                self.write(out/"graph"/"note"/f"{note_id}.json", data)
        self.con.commit()


def compile_site(app: App) -> None:
    """Copy files into output directory."""
    assert app.root is not None
    con = app.database
    output_directory = app.root/app.config.output_directory

    with output_directory_proxy(output_directory) as tempdir:
        CytoscapeDataGenerator(con).run(tempdir)
        ImagesGenerator(con).run(tempdir)
        IndexGenerator(app).run(tempdir)
        generate_css(tempdir)
        generate_js(tempdir)
        generate_favicons(tempdir)
        copy_boxicons(tempdir)
        copy_mathjax(tempdir)
