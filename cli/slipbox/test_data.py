# type: ignore
"""Test data.py."""

from . import data


def test_warning(capsys):
    """warning must print all messages to stderr."""
    data.warning("line1", "line2", "line3", "line4")
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert stderr
    for i in range(1, 5):
        assert f"line{i}" in stderr
