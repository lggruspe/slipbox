"""Slipbox configuration."""

from dataclasses import dataclass
from pathlib import Path

@dataclass
class Config:
    """Slipbox config object."""
    database = Path("slipbox.db")
    paths = [Path()]
    patterns = ['*.md']
    content_options = ""
    document_options = ""
    convert_to_data_url = False
