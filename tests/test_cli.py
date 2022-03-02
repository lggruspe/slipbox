"""Test cli.py."""

from slipbox.cli import parse_args


def test_parse_args_version() -> None:
    """parse_args should not require subcommand."""
    parse_args(["-v"])
    parse_args(["--version"])
