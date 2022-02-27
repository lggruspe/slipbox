"""App object."""

from dataclasses import dataclass
from pathlib import Path
from sqlite3 import Connection, connect
import sys
import typing as t

from .config import Config


def is_root(path: Path) -> bool:
    """Check if path is the root of a slipbox directory.

    NOTE Does not check if contents of .slipbox/ are valid.
    """
    return (path/".slipbox").is_dir()


def find_root() -> t.Optional[Path]:
    """Find slipbox root if it exists."""
    root = Path()
    while root != root.parent:
        if is_root(root):
            return root
    return root if is_root(root) else None


@dataclass
class App:
    """App object."""
    root: t.Optional[Path]
    config: Config
    database: Connection

    def cleanup(self) -> None:
        """Clean up."""
        self.database.close()


# Show error message and exit.
error = sys.exit


def startup() -> App:
    """Prepare app."""
    root = find_root()
    config = Config()
    if root:
        config.read_file(root/".slipbox"/"config.cfg")
    config.read_env()
    return App(
        root=root,
        config=config,
        database=connect(":memory:"),
    )
