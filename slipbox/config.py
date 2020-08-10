"""Slipbox configuration."""

from dataclasses import dataclass
from pathlib import Path
from typing import Sequence

@dataclass
class Config:
    """Slipbox config object."""
    database: Path = Path("slipbox.db")
    paths: Sequence[Path] = (Path(),)
    patterns: Sequence[str] = ('*.md',)
    content_options: str = ""
    document_options: str = ""
    convert_to_data_url: bool = False
