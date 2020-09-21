"""Slipbox configuration."""

from dataclasses import dataclass
from pathlib import Path

_CSS = Path(__file__).with_name("pandoc.css")

@dataclass
class Config:
    """Slipbox config object."""
    content_options: str = "--mathjax"
    document_options: str = "--mathjax -H {}".format(_CSS.resolve())
    convert_to_data_url: bool = False
