"""Testing fixtures."""

from pathlib import Path
import typing as t

import pytest

from slipbox.app import App, startup
from slipbox.commands import init


@pytest.fixture(autouse=True)
def change_root(tmp_path: Path, monkeypatch: pytest.MonkeyPatch) -> None:
    """Automatically change directory to temp test directory."""
    monkeypatch.chdir(tmp_path)


@pytest.fixture
def test_app() -> t.Iterable[App]:
    """App object without root."""
    yield startup({})


@pytest.fixture
def test_app_with_root(test_app: App) -> t.Iterable[App]:
    """App object with root."""
    test_app.args = {"quiet": True}
    init(test_app)
    yield test_app


@pytest.fixture
def app(test_app_with_root: App) -> t.Iterable[App]:
    """Alias for test_app_with_root."""
    yield test_app_with_root


@pytest.fixture
def files_abc(tmp_path: Path) -> t.Iterable[t.List[Path]]:
    """Create files in tmp_path: a.md, b.md, c.md."""
    files = [tmp_path/"a.md", tmp_path/"b.md", tmp_path/"c.md"]
    for path in files:
        path.write_text(path.name)
    yield files
