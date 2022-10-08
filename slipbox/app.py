"""App object."""

from dataclasses import dataclass, field
from functools import wraps
from pathlib import Path
from sqlite3 import Connection, connect
import sys
import typing as t

from .config import Config
from .database import migrate
from .errors import ErrorFormatter


def is_root(path: Path) -> bool:
    """Check if path is the root of a slipbox directory.

    NOTE Does not check if contents of .slipbox/ are valid.
    """
    return (path/".slipbox").is_dir()


def find_root() -> t.Optional[Path]:
    """Find slipbox root if it exists."""
    root = Path().resolve()
    while root != root.parent:
        if is_root(root):
            return root
        root = root.parent
    return root if is_root(root) else None


@dataclass
class RootlessApp:
    """App object before being initialized with a root directory."""
    args: t.Dict[str, t.Any]
    root: t.Optional[Path]
    config: Config
    database: Connection

    error_formatter: ErrorFormatter = field(default_factory=ErrorFormatter)

    def cleanup(self) -> None:
        """Clean up."""
        self.database.close()

    def backup_database(self) -> Path:
        """Create database backup.

        Returns path to backup database.
        """
        assert self.root
        backup = self.root/".slipbox"/"data.db.bak"
        with connect(str(backup.resolve())) as destination:
            self.database.backup(destination)
        return backup

    def restore_database_backup(self) -> None:
        """Restore database backup."""
        assert self.root
        self.cleanup()
        database = self.root/".slipbox"/"data.db"
        backup = self.root/".slipbox"/"data.db.bak"
        backup.replace(database)
        self.database = connect(str(database.resolve()))


@dataclass
class App(RootlessApp):
    """App object with a root directory."""
    root: Path


# Show error message and exit.
error = sys.exit


def startup(args: t.Dict[str, t.Any]) -> t.Union[App, RootlessApp]:
    """Prepare app."""
    app = RootlessApp(
        args=args,
        root=find_root(),
        config=Config(),
        database=connect(":memory:"),
    )

    root = app.root
    if root:
        app.config.read_file(root/".slipbox"/"config.cfg")
        app.database = connect(root/".slipbox"/"data.db")
        app = t.cast(App, app)

    app.config.read_env()
    migrate(app.database)
    return app


Command = t.Callable[[RootlessApp], None]


def require_init(cmd: t.Callable[[App], None]) -> Command:
    """Wrap command that needs to be initialized."""
    @wraps(cmd)
    def wrapper(app: RootlessApp) -> None:
        if app.root is None:
            error("slipbox has not been initialized")
        return cmd(t.cast(App, app))
    return wrapper
