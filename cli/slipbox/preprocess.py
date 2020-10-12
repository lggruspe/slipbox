"""Preprocess input files."""

from pathlib import Path

def concatenate(dest: Path, *sources: Path, basedir: Path) -> None:
    """Write contents of sources into dest.

    Each section is preceded by an HTML comment.
    """

    comment = """
<!--#slipbox-metadata
filename: {}
-->
"""
    with dest.open("w", encoding="utf-8") as file:
        for src in sources:
            filename = str(src.relative_to(basedir))
            print(comment.format(filename), file=file)
            print(src.read_text(encoding="utf-8"), file=file)
