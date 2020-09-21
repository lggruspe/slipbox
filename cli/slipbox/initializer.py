"""Initialize notes repository."""

from pathlib import Path
from sqlite3 import Connection, connect
from typing import List, Sequence

def initialize_database(conn: Connection) -> None:
    """Initialize database with schema.sql."""
    sql = Path(__file__).with_name("schema.sql").read_text()
    conn.executescript(sql)
    conn.commit()

def initialize(parent: Path) -> None:
    """Create .slipbox directory if it doesn't exist.

    Initializes .slipbox/data.db and .slipbox/patterns.
    """
    _slipbox = parent/".slipbox"
    if not _slipbox.exists():
        _slipbox.mkdir()
        database = _slipbox.joinpath("data.db")
        with connect(database) as conn:
            initialize_database(conn)
        _slipbox.joinpath("patterns").write_text("*.md\n*.markdown\n")

class DotSlipbox:
    """Initialized .slipbox/ directory."""
    def __init__(self, parent: Path = Path()):
        initialize(parent)
        self.parent = parent
        self.path = parent/".slipbox"

    @property
    def patterns(self) -> List[str]:
        """Return list of glob patterns."""
        text = self.path.joinpath("patterns").read_text()
        return [pat for pat in text.split('\n') if pat]

    @patterns.setter
    def patterns(self, value: Sequence[str]) -> None:
        """Set glob patterns."""
        with self.path.joinpath("patterns").open("w") as file:
            for pattern in value:
                if pattern:
                    print(pattern, file=file)
