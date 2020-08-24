"""Preprocess input files."""

from pathlib import Path

def concatenate(dest: Path, *sources: Path) -> None:
    """Write contents of sources into dest.

    Each section is preceded by an HTML comment.
    """

    comment = """
<!--#slipbox-metadata
filename: {}
-->
"""
    with dest.open("w") as file:
        for src in sources:
            print(comment.format(str(src)), file=file)
            print(src.read_text(), file=file)
