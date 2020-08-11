# type: ignore
"""Functions for mocking the database."""

import sqlite3
from typing import Iterable

import pytest

from . import scan
from .config import Config
from .slipbox import Slipbox

@pytest.fixture
def mock_db() -> Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as conn:
        scan.initialize_database(conn)
        yield conn

@pytest.fixture
def sbox(tmp_path) -> Slipbox:
    """Create automatically configured Slipbox object.

    - config.database is tmp_path/slipbox.db
    - config.paths consists of tmp_path
    """
    config = Config(database=tmp_path/"slipbox.db", paths=(tmp_path,))
    with Slipbox(config) as slipbox:
        yield slipbox
