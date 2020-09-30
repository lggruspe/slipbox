"""Build HTML from all notes in slipbox."""

from argparse import ArgumentParser
from pathlib import Path
import sys

from .app import check_notes, main, show_info
from .initializer import DotSlipbox, default_config
from .utils import check_requirements

if __name__ == "__main__":
    if not check_requirements():
        sys.exit("[ERROR] pandoc not found.")

    parser = ArgumentParser(description="Generate a single-page HTML from your notes.")
    subparsers = parser.add_subparsers(dest="command")

    build = subparsers.add_parser("build", help="generate static site")

    check = subparsers.add_parser("check", help="check slipbox links")

    info = subparsers.add_parser("info", help="show information about note")
    info.add_argument("id", type=int, help="note ID")

    defaults = default_config()
    init = subparsers.add_parser("init", help="initialize notes directory")
    init.add_argument("directory", nargs='?', type=Path, default=Path())
    init.add_argument("-c", "--content-options",
                      default=defaults.get("slipbox", "content_options"),
                      help="pandoc options for the content")
    init.add_argument("-d", "--document-options",
                      default=defaults.get("slipbox", "document_options"),
                      help="pandoc options for the output")
    init.add_argument("--convert-to-data-url", action="store_true",
                      default=defaults.getboolean("slipbox", "convert_to_data_url"),
                      help="convert local images links to data URL")

    args = parser.parse_args()

    dot_slipbox = DotSlipbox.locate(Path().resolve())

    command = args.command
    del args.command
    if command == "init":
        args.convert_to_data_url = str(args.convert_to_data_url)
        parent = args.directory
        del args.directory
        parent.mkdir(parents=True, exist_ok=True)
        DotSlipbox(parent, args)
        print(f"Initialized .slipbox in {parent.resolve()!s}.")
    elif dot_slipbox is not None:
        if command == "build":
            main(dot_slipbox)
        elif command == "check":
            check_notes(dot_slipbox)
        elif command == "info":
            show_info(dot_slipbox, args.id)
    else:
        sys.exit("could not find '.slipbox' in any parent directory.")
