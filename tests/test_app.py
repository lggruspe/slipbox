"""Test app.py."""

import pytest

from slipbox.app import App, find_root


def test_find_root_in_current(app: App) -> None:
    """find_root must find .slipbox if it's in the current directory."""
    assert find_root() == app.root


def test_find_root_in_parent(
    app: App,
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    """find_root must find .slipbox if it's in a parent directory."""
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


def test_app_database_backup_and_restore(app: App) -> None:
    """Backup database should be removed after restoring."""
    backup = app.root/".slipbox"/"data.db.bak"
    before = "\n".join(app.database.iterdump())

    assert not backup.exists()

    app.backup_database()
    app.database.execute("drop table Notes")

    assert backup.is_file()

    app.restore_database_backup()
    after = "\n".join(app.database.iterdump())

    assert not backup.exists()
    assert before == after
