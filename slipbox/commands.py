"""slipbox CLI commands."""

import configparser
from pathlib import Path
import sys

from . import check
from .app import App, error, require_init, RootlessApp
from .processor import METADATA_TEMPLATES


@require_init
def show_info(app: App) -> None:
    """Show note info."""
    note_id = int(app.args["note_id"])
    sql = "SELECT title, filename FROM Notes WHERE id = ?"
    cur = app.database.cursor()
    cur.execute(sql, (note_id,))
    note = cur.fetchone()

    if note is None:
        error(f"note {note_id} does not exist")

    print(note_id)
    print(note[0])
    print(note[1])


@require_init
def check_notes(app: App) -> None:
    """Check for isolated notes and invalid links."""
    if not check.check_notes(app):
        sys.exit(65)


def list_supported_formats(_: RootlessApp) -> None:
    """List supported input file formats."""
    for key in METADATA_TEMPLATES:
        print(f"*{key}")


def init(app: RootlessApp) -> None:
    """Initialize notes directory."""
    if app.root is not None:
        root = str(app.root.resolve())
        error(f"slipbox has already been initialized in {root}")

    config = app.args.get("config")
    if config is not None:
        try:
            app.config.read_file(Path(config))
        except configparser.Error:
            error(f"invalid config file: {config}")

    app.root = Path().resolve()
    hidden = app.root/".slipbox"
    hidden.mkdir(parents=True, exist_ok=True)
    app.config.write(hidden/"config.cfg")

    if not app.args.get("quiet"):
        print(f"slipbox initialized in {app.root.resolve()!s}")
        print("You can configure slipbox by editing .slipbox/config.cfg.")
