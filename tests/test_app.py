"""Test app.py."""

import pytest

from slipbox.app import App, find_root


def test_find_root_in_current(test_app_with_root: App) -> None:
    """find_root must find .slipbox if it's in the current directory."""
    app = test_app_with_root
    root = find_root()
    assert root == app.root


def test_find_root_in_parent(test_app_with_root: App,
                             monkeypatch: pytest.MonkeyPatch) -> None:
    """find_root must find .slipbox if it's in a parent directory."""
    app = test_app_with_root
    assert app.root is not None

    path = app.root/"foo"/"bar"/"baz"
    path.mkdir(parents=True)
    monkeypatch.chdir(path)

    assert not path.joinpath(".slipbox").exists()

    root = find_root()
    assert root is not None
    assert app.root == root
    assert root.joinpath(".slipbox").exists()


def test_find_root_none() -> None:
    """find_root should return None if slipbox has not been initialized."""
    assert find_root() is None
