"""Runtime dependency checks."""

from shutil import which

from .app import RootlessApp


def check_requirements(app: RootlessApp) -> bool:
    """Check if all runtime requirements are satisfied."""
    requirements = [
        app.config.pandoc,
        app.config.dot,
    ]
    return all(map(which, requirements))
