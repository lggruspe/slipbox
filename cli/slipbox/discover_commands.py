"""Module for discovering custom CLI commands."""

import importlib
import pkgutil
import types
import typing as t

import genbu


def get_commands(module: types.ModuleType) -> t.Iterable[genbu.Genbu]:
    """Get custom commands from module if any.

    The custom commands must be Genbu instances in module.exports.
    """
    try:
        exports = getattr(module, "exports", ())
        yield from (x for x in exports if isinstance(x, genbu.Genbu))
    except TypeError:
        pass


def discover_commands(prefix: str = "slipbox_cli_") -> t.Iterable[genbu.Genbu]:
    """Discover custom CLI commands based on namespace: slipbox_cli_."""
    for info in pkgutil.iter_modules():
        if info.name.startswith(prefix):
            module = importlib.import_module(info.name)
            yield from get_commands(module)
