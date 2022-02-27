"""Runtime dependency checks."""

from shutil import which

from .app import App


def check_requirements(app: App) -> bool:
    """Check if all runtime requirements are satisfied."""
    requirements = [
        app.config.pandoc,
        app.config.dot,
    ]
    return all(map(which, requirements))
