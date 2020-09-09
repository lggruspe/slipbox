"""Slipbox configuration."""

from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

_CSS = Path(__file__).with_name("pandoc.css")

@dataclass
class Config:
    """Slipbox config object."""
    database: Path = Path("slipbox.db")
    paths: Sequence[Path] = (Path(),)
    patterns: Sequence[str] = ('*.md',)
    content_options: str = "--mathjax"
    document_options: str = "--mathjax -H {}".format(_CSS.resolve())
    convert_to_data_url: bool = False
