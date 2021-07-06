"""Test initializer.py."""

from pathlib import Path
import pytest
from slipbox.initializer import DotSlipbox


def test_initialize(tmp_path: Path) -> None:
    """Must initialize .slipbox in the parent directory."""
    dot = DotSlipbox(tmp_path).path
    assert dot.is_dir()
    assert dot.joinpath("data.db").is_file()
    assert dot.joinpath("config.cfg").is_file()
    assert dot.joinpath("patterns").is_file()


def test_dot_slipbox_locate(tmp_path: Path) -> None:
    """find_dot_slipbox must look for .slipbox in parent directories."""
    with pytest.raises(Exception):
        DotSlipbox.locate(tmp_path)

    dot = DotSlipbox(tmp_path)
    assert DotSlipbox.locate(tmp_path).path == dot.path

    child = tmp_path/"child"
    child.mkdir()
    assert DotSlipbox.locate(child).path == dot.path

    for file in dot.path.iterdir():
        file.unlink()
    dot.path.rmdir()

    with pytest.raises(Exception):
        DotSlipbox.locate(child)
    with pytest.raises(Exception):
        DotSlipbox.locate(tmp_path)


def test_dot_slipbox_patterns(tmp_path: Path) -> None:
    """Test patterns property."""
    dot = DotSlipbox(tmp_path)
    patterns = sorted(dot.patterns)
    assert "*.markdown" in patterns
    assert "*.md" in patterns
    assert "*.mdown" in patterns

    patterns = ["*.rst", "*.txt"]
    dot.patterns = patterns
    assert dot.patterns == patterns
