"""Build HTML from all notes in slipbox."""

from argparse import ArgumentParser
from pathlib import Path
import sys

from .config import Config
from .initializer import initialize, DotSlipbox
from .slipbox import Slipbox
from .utils import check_requirements, check_if_initialized

def main(config_: Config) -> None:
    """Compile notes into static page."""
    dot = DotSlipbox()
    with Slipbox(config=config_, dot=dot) as slipbox:
        slipbox.run()

if __name__ == "__main__":
    if not check_requirements():
        sys.exit("[ERROR] pandoc not found.")

    config = Config()
    parser = ArgumentParser(
        description="Generate a single-page HTML from your notes.")
    parser.add_argument("-c", "--content-options", default=config.content_options,
                        help="pandoc options for the content")
    parser.add_argument("-d", "--document-options", default=config.document_options,
                        help="pandoc options for the final HTML output")
    parser.add_argument("--convert-to-data-url", action="store_true",
                        default=config.convert_to_data_url,
                        help="convert local image links to data URL")

    subparsers = parser.add_subparsers(dest="command")
    init = subparsers.add_parser("init", help="initialize notes directory")
    args = parser.parse_args()

    command = args.command
    del args.command
    config = Config(**vars(args))
    if command == "init":
        parent = Path()
        initialize(parent)
        print(f"Initialized .slipbox in {parent.resolve()!s}.")
    elif check_if_initialized():
        if not command:
            main(config)
    else:
        sys.exit("could not find '.slipbox' in any parent directory.")
