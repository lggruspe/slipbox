"""Functions for mocking the database."""

from pathlib import Path
import sqlite3
import typing as t

import pytest

from slipbox.initializer import initialize_database, DotSlipbox
from slipbox.slipbox import Slipbox


@pytest.fixture
def mock_db() -> t.Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as conn:
        initialize_database(conn)
        yield conn


@pytest.fixture
def sbox(tmp_path: Path) -> t.Iterable[Slipbox]:
    """Create automatically configured Slipbox object."""
    dot = DotSlipbox(tmp_path)
    with Slipbox(dot) as slipbox:
        yield slipbox


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
