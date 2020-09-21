# type: ignore
"""Functions for mocking the database."""

from pathlib import Path
import sqlite3
from typing import Iterable, List

import pytest

from .initializer import initialize_database
from .slipbox import Slipbox

@pytest.fixture
def mock_db() -> Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as conn:
        initialize_database(conn)
        yield conn

@pytest.fixture
def sbox(tmp_path) -> Slipbox:
    """Create automatically configured Slipbox object."""
    with Slipbox(basedir=tmp_path) as slipbox:
        yield slipbox

@pytest.fixture
def files_abc(tmp_path) -> List[Path]:
    """Create files in tmp_path: a.md, b.md, c.md."""
    files = [tmp_path/"a.md", tmp_path/"b.md", tmp_path/"c.md"]
    for path in files:
        path.touch()
    yield files
