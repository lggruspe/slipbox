"""Slipbox CLI parser."""

from argparse import ArgumentParser, RawDescriptionHelpFormatter
from pathlib import Path
import typing as t


def parse_args(argv: t.Optional[t.Sequence[str]] = None) -> t.Dict[str, t.Any]:
    """Returns dict of command-line options and arguments.

    Name of subcommand can be accessed using the key: "(command)".
    """
    epilog = """
  build     Build website.
  check     Check for isolated notes and invalid links.
  formats   List supported input file formats.
  info      Show note info.
  init      Initialize notes directory.
  new       Get unused note IDs.
"""

    parser = ArgumentParser(
        prog="slipbox",
        description="Generate a static website from your notes.",
        formatter_class=RawDescriptionHelpFormatter,
        epilog=epilog,
    )
    parser.add_argument(
        "-v",
        "--version",
        action="store_true",
        help="show version number and exit",
    )

    # Add subcommands
    subparsers = parser.add_subparsers(
        title="commands",
        dest="(command)",
    )

    subparser = subparsers.add_parser("build", description="Build website.")
    subparser.add_argument(
        "--no-output",
        action="store_false",
        dest="output",
        help="update database only; do not generate site in output directory",
    )

    subparsers.add_parser(
        "check",
        description="Check for isolated notes and invalid links.",
    )

    subparser = subparsers.add_parser("info", description="Show note info.")
    subparser.add_argument("note_id", type=int)

    subparsers.add_parser(
        "formats",
        description="List supported input file formats.",
    )

    subparser = subparsers.add_parser(
        "init",
        description="Initialize notes directory.",
    )
    subparser.add_argument("config", nargs="?", type=Path, help="config file")
    subparser.add_argument("-q", "--quiet", action="store_true")

    subparser = subparsers.add_parser(
        "new",
        description="Get unused note IDs.",
    )
    subparser.add_argument(
        "-n",
        type=int,
        default=1,
        help="number of note IDs to generate",
    )
    return vars(parser.parse_args(argv))


__all__ = ["parse_args"]
