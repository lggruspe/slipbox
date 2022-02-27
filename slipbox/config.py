"""Slipbox configuration."""

from configparser import ConfigParser
from dataclasses import dataclass
from pathlib import Path
import typing as t


@dataclass
class Config:
    """Slipbox config class."""

    # [slipbox]
    content_options = "--strip-comments"
    document_options = "-s"
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

    def read(self, config: ConfigParser) -> None:
        """Update from configparser."""
        self.content_options = config.get("slipbox", "content_options",
                                          fallback=self.content_options)
        self.document_options = config.get("slipbox", "document_options",
                                           fallback=self.document_options)
        self.output_directory = Path(config.get("slipbox", "output_directory",
                                                fallback=self.output_directory)
                                     )
        self.title = config.get("slipbox", "title", fallback=self.title)

        for key, _ in config.items("note-patterns"):
            try:
                val = config.getboolean("note-patterns", key,
                                        fallback=self.patterns[key])
            except KeyError:
                continue
            self.patterns[key] = val

        self.pandoc = config.get("paths", "pandoc", fallback=self.pandoc)
        self.dot = config.get("paths", "dot", fallback=self.dot)

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

    def to_config_parser(self) -> ConfigParser:
        """Convert to ConfigParser object."""
        config = ConfigParser()

        sections = ["slipbox", "note-patterns", "paths"]
        for section in sections:
            if not config.has_section(section):
                config.add_section(section)

        config.set("slipbox", "content_options", self.content_options)
        config.set("slipbox", "document_options", self.document_options)
        config.set("slipbox", "output_directory",
                   str(self.output_directory.resolve()))
        config.set("slipbox", "title", self.title)

        for pattern, include in self.patterns.items():
            config.set("note-patterns", pattern,
                       "true" if include else "false")

        config.set("paths", "pandoc", self.pandoc)
        config.set("paths", "dot", self.dot)
        return config

    def write(self, path: Path) -> None:
        """Write config to file."""
        with open(path) as file:
            self.to_config_parser().write(file)


__all__ = ["Config"]
