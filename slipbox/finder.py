"""Finds notes."""

from pathlib import Path
import typing as t

from .app import App


def find_notes(app: App) -> t.Iterable[Path]:
    """Find notes in slipbox directory."""
    assert app.root and app.root.is_dir()

    include: t.List[str] = []
    exclude: t.List[str] = []
    for pattern, true in app.config.patterns.items():
        (include if true else exclude).append(pattern)

    for path in app.root.rglob("*"):
        if not path.is_file():
            continue
        if not any(path.match(pat) for pat in include):
            continue
        if any(path.match(pat) for pat in exclude):
            continue
        yield path
