"""Test __main__.py."""

import sys

import pytest

from slipbox.__main__ import main


def test_main_no_args(
    capsys: pytest.CaptureFixture[str],
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """main shouldn't exit with error."""
    monkeypatch.setattr(sys, "argv", [])

    main()
    stdout, stderr = capsys.readouterr()
    assert not stdout
    assert not stderr
