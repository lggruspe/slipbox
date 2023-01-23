# pylint: disable=too-many-instance-attributes
"""Slipbox configuration.

Config overriding strategy:
command-line args > environment variables > config file > default config.
"""

from configparser import ConfigParser
from dataclasses import dataclass
import os
from pathlib import Path


@dataclass
class Config:
    """Slipbox config class."""
    # [slipbox]
    output_directory = Path("public")
    title = "Slipbox"

    # [note-patterns]
    patterns = {
        "*.md": True,
        "*.markdown": True,
        "*.rst": True,
    }

    # [paths]
    pandoc = "pandoc"
    dot = "dot"

    # [pandoc-options]
    bibliography = None
    csl = None
    strip_comments = True

    # [check]
    checks = {
        "empty-link-target": True,
        "isolated-note": True,
        "missing-citations": True,
    }

    def __post_init__(self) -> None:
        self._update_from_env()

    @staticmethod
    def from_file(path: Path) -> "Config":
        """Return Config object from file."""
        parser = ConfigParser()
        parser.read_string(path.read_text())

        default = Config()

        # [slipbox]
        default.output_directory = Path(
            parser.get(
                "slipbox",
                "output_directory",
                fallback=default.output_directory,
            ),
        )
        default.title = parser.get("slipbox", "title", fallback=default.title)

        # [paths]
        default.pandoc = parser.get("paths", "pandoc", fallback=default.pandoc)
        default.dot = parser.get("paths", "dot", fallback=default.dot)

        # [note-patterns]
        if parser.has_section("note-patterns"):
            default.patterns = {}
            for key, _ in parser.items("note-patterns"):
                val = parser.getboolean("note-patterns", key, fallback=False)
                default.patterns[key] = val

        # [pandoc-options]
        bibliography = parser.get(
            "pandoc-options",
            "bibliography",
            fallback=None,
        )
        if bibliography:
            default.bibliography = Path(bibliography)

        csl = parser.get(
            "pandoc-options",
            "csl",
            fallback=None,
        )
        if csl:
            default.csl = Path(csl)

        default.strip_comments = parser.getboolean(
            "pandoc-options",
            "strip-comments",
            fallback=default.strip_comments,
        )

        # [check]
        if parser.has_section("check"):
            default.checks = {}
            for key, _ in parser.items("check"):
                val = parser.getboolean("check", key, fallback=False)
                default.checks[key] = val

        default._update_from_env()  # pylint: disable=protected-access
        return default

    def _update_from_env(self) -> None:
        """Update some config variables from environment variables."""
        self.pandoc = os.getenv("PANDOC", self.pandoc)
        self.dot = os.getenv("DOT", self.dot)

    def to_config_parser(self) -> ConfigParser:
        """Convert to ConfigParser object."""
        config = ConfigParser()

        sections = [
            "slipbox",
            "note-patterns",
            "paths",
            "pandoc-options",
            "check",
        ]
        for section in sections:
            if not config.has_section(section):
                config.add_section(section)

        config.set(
            "slipbox",
            "output_directory",
            str(self.output_directory),
        )
        config.set("slipbox", "title", self.title)

        for pattern, include in self.patterns.items():
            config.set(
                "note-patterns",
                pattern,
                "true" if include else "false",
            )

        config.set("paths", "pandoc", self.pandoc)
        config.set("paths", "dot", self.dot)

        if self.bibliography is not None:
            config.set(
                "pandoc-options",
                "bibliography",
                str(self.bibliography),
            )
        if self.csl is not None:
            config.set(
                "pandoc-options",
                "csl",
                str(self.csl),
            )
        config.set(
            "pandoc-options",
            "strip-comments",
            "true" if self.strip_comments else "false",
        )

        for check, include in self.checks.items():
            config.set(
                "check",
                check,
                "true" if include else "false",
            )
        return config

    def write(self, path: Path) -> None:
        """Write config to file."""
        with open(path, "w", encoding="utf-8") as file:
            self.to_config_parser().write(file)


__all__ = ["Config"]
