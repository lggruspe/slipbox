"""Static site generator for Zettelkasten notes."""

import sys
import typing as t

from . import commands
from .app import App, error, startup
from .build import build
from .dependencies import check_requirements
from .cli import parse_args
from .tools.new import new_note


Command = t.Callable[[App], None]

handlers: t.Dict[str, Command] = {
    "build": build,
    "check": commands.check_notes,
    "formats": commands.list_supported_formats,
    "info": commands.show_info,
    "init": commands.init,
    "new": new_note,
}


def main() -> None:
    """Entrypoint."""
    app = startup(parse_args())
    if not check_requirements(app):
        error("pandoc not found")

    if app.args.get("version"):
        print("""slipbox 0.18.0
Copyright (C) 2020-2022 Levi Gruspe
https://github.com/lggruspe/slipbox""")
        sys.exit()

    handler = handlers[app.args["(command)"]]
    if handler is not None:
        handler(app)
    app.cleanup()


if __name__ == "__main__":
    main()
