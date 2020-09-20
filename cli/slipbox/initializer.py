"""Initialize notes repository."""

from pathlib import Path
from sqlite3 import Connection, connect

def initialize_database(conn: Connection) -> None:
    """Initialize database with schema.sql."""
    sql = Path(__file__).with_name("schema.sql").read_text()
    conn.executescript(sql)
    conn.commit()

def initialize() -> None:
    """Create .slipbox directory."""
    _slipbox = Path(".slipbox")
    _slipbox.mkdir()
    database = _slipbox.joinpath("data.db")
    with connect(database) as conn:
        initialize_database(conn)
    print("Initialized .slipbox/ in current directory.")
