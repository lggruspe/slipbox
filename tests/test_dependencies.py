"""Test dependencies.py."""

from slipbox.app import RootlessApp
from slipbox.dependencies import has_dot, has_pandoc


def test_has_dot_not_installed(app_without_root: RootlessApp) -> None:
    """has_dot should return False if dot is not installed."""
    app = app_without_root
    app.config.dot = ""
    assert not has_dot(app)


def test_has_pandoc_not_installed(app_without_root: RootlessApp) -> None:
    """has_pandoc should return False if pandoc is not installed."""
    app = app_without_root
    app.config.pandoc = ""
    assert not has_pandoc(app)
