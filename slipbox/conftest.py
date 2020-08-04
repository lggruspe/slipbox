# type: ignore
"""Functions for mocking the database."""

import sqlite3
from typing import Iterable

import pytest

from . import scan

@pytest.fixture
def mock_db() -> Iterable[sqlite3.Connection]:
    """Create an empty mock database with all the necessary tables."""
    with sqlite3.connect(":memory:") as conn:
        scan.initialize_database(conn)
        yield conn
