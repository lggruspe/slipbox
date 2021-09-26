"""Test scan.py."""

from pathlib import Path
import pytest
from slipbox import scan


def test_build_command(tmp_path: Path) -> None:
    """Sanity check for build_command."""
    input_file = tmp_path/"input.md"
    output = "output.html"
    options = "--mathml"
    input_file.touch()

    cmd = scan.build_command(input_file, output, tmp_path, options)
    assert str(input_file) in cmd
    assert f"-o {output}" in cmd
    assert options in cmd


@pytest.mark.xfail
def test_build_command_when_input_file_does_not_exist(tmp_path: Path) -> None:
    """build_command must fail if input file does not exist."""
    input_file = tmp_path/"input.md"
    scan.build_command(input_file, "output.html", tmp_path, "")
