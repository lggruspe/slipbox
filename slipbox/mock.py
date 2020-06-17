"""Functions for mocking the database."""

import contextlib
import sqlite3

from . import scan

@contextlib.contextmanager
def mock_database(script):
    """Create an empty mock database with all the necessary tables.

    It executes script after initializing the database.
    """
    conn = sqlite3.connect(":memory:")
    scan.initialize_database(conn)
    conn.executescript(script)
    yield conn
    conn.close()
