"""Slipbox configuration."""

from configparser import ConfigParser
from dataclasses import dataclass
import os
from pathlib import Path
import typing as t


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

    def read(self, config: ConfigParser) -> None:
        """Update from configparser."""
        self.output_directory = Path(
            config.get(
                "slipbox",
                "output_directory",
                fallback=self.output_directory,
            ),
        )
        self.title = config.get("slipbox", "title", fallback=self.title)

        self.patterns = {}
        for key, _ in config.items("note-patterns"):
            val = config.getboolean("note-patterns", key, fallback=False)
            self.patterns[key] = val

        self.pandoc = config.get("paths", "pandoc", fallback=self.pandoc)
        self.dot = config.get("paths", "dot", fallback=self.dot)

        bibliography = config.get(
            "pandoc-options",
            "bibliography",
            fallback=None,
        )
        self.bibliography = (
            Path(bibliography) if bibliography else self.bibliography
        )
        self.strip_comments = config.getboolean(
            "pandoc-options",
            "strip-comments",
            fallback=self.strip_comments,
        )

    def read_file(self, path: Path) -> None:
        """Update config from file."""
        config = ConfigParser()
        config.read_string(path.read_text())
        self.read(config)

    def read_dict(self, dict_: t.Dict[str, t.Any]) -> None:
        """Update config from dict."""
        config = ConfigParser()
        config.read_dict(dict_)
        self.read(config)

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
