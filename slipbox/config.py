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
    strip_comments = True

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

        default.strip_comments = parser.getboolean(
            "pandoc-options",
            "strip-comments",
            fallback=default.strip_comments,
        )
        return default

    def read_env(self) -> None:
        """Update config from environment variables.

        NOTE Not all options can be set using environment variables.
        """
        self.pandoc = os.getenv("PANDOC", self.pandoc)
        self.dot = os.getenv("DOT", self.dot)

    def to_config_parser(self) -> ConfigParser:
        """Convert to ConfigParser object."""
        config = ConfigParser()

        sections = ["slipbox", "note-patterns", "paths", "pandoc-options"]
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
        config.set(
            "pandoc-options",
            "strip-comments",
            "true" if self.strip_comments else "false",
        )
        return config

    def write(self, path: Path) -> None:
        """Write config to file."""
        with open(path, "w", encoding="utf-8") as file:
            self.to_config_parser().write(file)


__all__ = ["Config"]
