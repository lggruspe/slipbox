"""Static site generator for Zettelkasten notes."""

import sys
import typing as t

from . import __version__, commands
from .app import error, RootlessApp, startup
from .build import build
from .cli import parse_args
from .dependencies import has_dot, has_pandoc
from .tools.new import new_note


Command = t.Callable[[RootlessApp], None]


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
    if not has_pandoc(app):
        error("pandoc not found")
    if not has_dot(app):
        error("dot (graphviz) not found")

    if app.args.get("version"):
        print(f"""slipbox {__version__}
Copyright (C) 2020 Levi Gruspe
https://github.com/lggruspe/slipbox""")
        sys.exit()

    command = app.args["(command)"]
    if command is not None:
        handler = handlers[command]
        if handler is not None:
            handler(app)
    app.cleanup()


if __name__ == "__main__":
    main()
