# type: ignore
"""Test initializer.py."""

from .initializer import initialize

def test_initialize(tmp_path):
    """Must initialize .slipbox in the parent directory."""
    initialize(tmp_path)
    dot = tmp_path/".slipbox"
    assert dot.exists() and dot.is_dir()
    data = dot/"data.db"
    assert data.exists() and data.is_file()
    patterns = dot/"patterns"
    assert patterns.exists() and patterns.is_file()
