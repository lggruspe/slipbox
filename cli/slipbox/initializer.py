"""Initialize notes repository."""

from configparser import ConfigParser
from pathlib import Path
from sqlite3 import Connection, connect
import typing as t

from .processor import METADATA_TEMPLATES


def initialize_database(conn: Connection) -> None:
    """Initialize database with schema.sql."""
    sql = Path(__file__).with_name("schema.sql").read_text()
    conn.executescript(sql)
    conn.commit()


def default_config() -> ConfigParser:
    """Create ConfigParser object with default options."""
    config = ConfigParser()
    config["slipbox"] = {
        "content_options": "--mathjax --strip-comments",
        "document_options": "--mathjax -s",
        "output_directory": "public",
        "title": "Slipbox",
    }
    return config


class DotSlipbox:
    """Initialized .slipbox/ directory."""
    def __init__(self,
                 parent: Path,
                 args: t.Optional[t.Dict[str, t.Any]] = None,
                 ):
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
                config["slipbox"].update(args)
            with open(self.path/"config.cfg", "w") as config_file:
                config.write(config_file)
            self.patterns = ['*' + key for key in METADATA_TEMPLATES]

    @property
    def patterns(self) -> t.List[str]:
        """Return list of glob patterns."""
        text = self.path.joinpath("patterns").read_text(encoding="utf-8")
        return [pat for pat in text.split('\n') if pat]

    @patterns.setter
    def patterns(self, value: t.Sequence[str]) -> None:
        """Set glob patterns."""
        self.path.joinpath("patterns").write_text('\n'.join(value))

    @property
    def config(self) -> ConfigParser:
        """Return ConfigParser object from .slipbox/config.cfg."""
        config = ConfigParser()
        config.read(self.path/"config.cfg")
        return config

    @staticmethod
    def locate(path: Path = Path().resolve()) -> "DotSlipbox":
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
        raise Exception("could not find '.slipbox' in any parent directory.")

    def database(self) -> Connection:
        """Create connection to .slipbox/data.db."""
        return connect(self.path/"data.db")
