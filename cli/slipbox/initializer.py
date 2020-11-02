"""Initialize notes repository."""

from argparse import Namespace
from configparser import ConfigParser
from pathlib import Path
from sqlite3 import Connection, connect
import sys
from typing import List, Sequence, Optional

def initialize_database(conn: Connection) -> None:
    """Initialize database with schema.sql."""
    sql = Path(__file__).with_name("schema.sql").read_text()
    conn.executescript(sql)
    conn.commit()

def default_config() -> ConfigParser:
    """Create ConfigParser object with default options."""
    config = ConfigParser()
    config["slipbox"] = {
        "content_options": "--mathjax",
        "document_options": "--mathjax -s -o index.html",
        "convert_to_data_url": "False",
    }
    return config

class DotSlipbox:
    """Initialized .slipbox/ directory."""
    def __init__(self, parent: Path, args: Optional[Namespace] = None, *, exit_: bool = True):
        """Initialize data.db, patterns and config.cfg in ./slipbox/."""
        self.parent = parent
        self.path = parent/".slipbox"
        self.existing = True
        if not self.path.exists():
            self.existing = False
            self.path.mkdir()
            database = self.path.joinpath("data.db")
            with connect(database) as conn:
                initialize_database(conn)
            config = default_config()
            if args is not None:
                config["slipbox"].update(vars(args))
            with open(self.path/"config.cfg", "w") as config_file:
                config.write(config_file)
            self.path.joinpath("patterns").write_text("*.md\n*.markdown\n")
        self.check_config(exit_)

    @property
    def patterns(self) -> List[str]:
        """Return list of glob patterns."""
        text = self.path.joinpath("patterns").read_text(encoding="utf-8")
        return [pat for pat in text.split('\n') if pat]

    @patterns.setter
    def patterns(self, value: Sequence[str]) -> None:
        """Set glob patterns."""
        with self.path.joinpath("patterns").open("w") as file:
            for pattern in value:
                if pattern:
                    print(pattern, file=file)

    @property
    def config(self) -> ConfigParser:
        """Return ConfigParser object from .slipbox/config.cfg."""
        config = ConfigParser()
        config.read(self.path/"config.cfg")
        return config

    @staticmethod
    def locate(path: Path) -> Optional["DotSlipbox"]:
        """Find .slipbox in parent directories of path, or None.

        Input path must be absolute.
        """
        assert path.is_absolute()
        while not path.is_dir():
            path = path.parent
        parent = path.parent
        while parent != path:
            dot = path/".slipbox"
            if dot.is_dir():
                return DotSlipbox(path)
            path = parent
            parent = path.parent
        return None

    def database(self) -> Connection:
        """Create connection to .slipbox/data.db."""
        return connect(self.path/"data.db")

    def check_config(self, exit_: bool = True) -> bool:
        """Check .slipbox/config.cfg."""
        content_options = self.config.get("slipbox", "content_options")
        if "--strip-comments" in content_options:
            config_path = self.path.joinpath("config.cfg").resolve()
            if not self.existing:
                for path in self.path.iterdir():
                    path.unlink()
                self.path.rmdir()
            if exit_:
                sys.exit(f"invalid content_options value in {config_path!s}")
            return False
        return True
