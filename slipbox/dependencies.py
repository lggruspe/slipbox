"""Runtime dependency checks."""

from shutil import which

from .app import RootlessApp


def has_dot(app: RootlessApp) -> bool:
    """Check if dot is installed."""
    return bool(which(app.config.dot))


def has_pandoc(app: RootlessApp) -> bool:
    """Check if pandoc is installed."""
    return bool(which(app.config.pandoc))


def check_requirements(app: RootlessApp) -> bool:
    """Check if all runtime requirements are satisfied."""
    return has_pandoc(app) and has_dot(app)
