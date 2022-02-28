"""Functions for mocking the database."""

from pathlib import Path
import sqlite3
import typing as t

import pytest

from slipbox.app import App, startup
from slipbox.commands import init
from slipbox.database import migrate


@pytest.fixture(autouse=True)
def change_root(tmp_path: Path, monkeypatch):
    monkeypatch.chdir(tmp_path)


@pytest.fixture
def test_app() -> t.Iterable[App]:
    """App object without root."""
    yield startup({})


@pytest.fixture
def test_app_with_root(test_app: App) -> t.Iterable[App]:
    """App object with root."""
    test_app.args = {"quiet": True}
    init(test_app)
    yield test_app


@pytest.fixture
def test_note() -> t.Iterable[Path]:
    """Test note."""
    path = Path()/"test.md"
    path.write_text("# 0 Test\n\nTest note.\n")
    yield path


@pytest.fixture
def mock_db() -> t.Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as con:
        migrate(con)
        yield con


@pytest.fixture
def files_abc(tmp_path: Path) -> t.Iterable[t.List[Path]]:
    """Create files in tmp_path: a.md, b.md, c.md."""
    files = [tmp_path/"a.md", tmp_path/"b.md", tmp_path/"c.md"]
    for path in files:
        path.write_text(path.name)
    yield files


@pytest.fixture
def mnote(tmp_path: Path) -> t.Iterable[Path]:
    """Mock markdown note in tmp_path/test.md."""
    path = tmp_path/"test.md"
    path.write_text("# 0 Test\n\nTest note.\n")
    yield path


@pytest.fixture
def test_md(tmp_path: Path) -> t.Iterable[Path]:
    """Empty test file (tmp_path/test.md)."""
    yield tmp_path/"test.md"


@pytest.fixture
def test_bib(tmp_path: Path) -> t.Iterable[Path]:
    """Test bibliography."""
    path = tmp_path/"test.bib"
    path.write_text("""
@book{test_2020,
    title = {Title},
    language = {English},
    author = {Author},
    year = {2020}
}
""")
    yield path
