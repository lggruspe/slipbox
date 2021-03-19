"""Process notes and store results in database.

Preprocessors insert metadata blocks into notes as comments.
They are mainly used to pass note metadata to Pandoc filters even when
the input is the concatenation of several files.
"""

from configparser import ConfigParser
from pathlib import Path
from sqlite3 import Connection
import sys
from typing import Any, Callable, Sequence

from . import utils
from .batch import Batch
from .data import process_csvs
from .scan import build_command
from .secparse import parse_sections, SectionParser


Template = Callable[..., str]


def html_metadata(**fields: Any) -> str:
    """Render HTML comment metadata block."""
    template = """
<!--#slipbox-metadata
{}
-->
"""
    body = '\n'.join(
        f"{k}: {v}"
        for k, v in fields.items()
    )
    return template.format(body)


def preprocess_markdown(*sources: Path, basedir: Path) -> str:
    """Preprocess markdown notes."""
    return "".join(
        html_metadata(filename=str(source.relative_to(basedir)))
        + source.read_text(encoding="utf-8")
        for source in sources
    )


def store_html(conn: Connection,
               html: str,
               sources: Sequence[Path]) -> None:
    """Insert HTML sections into Notes table."""
    if not html.strip() or not sources:
        return
    cur = conn.cursor()

    def callback(this: SectionParser) -> None:
        """Callback for parse_sections."""
        cur.execute(
            "UPDATE Notes SET html = ? WHERE id = ?",
            (this.section, this.id_)
        )
    parse_sections(html, callback)


def process_batch(conn: Connection,
                  batch: Batch,
                  config: ConfigParser,
                  basedir: Path) -> None:
    """Process batch of input notes."""
    with utils.temporary_directory() as tempdir:
        preprocessed_input = tempdir/"input.md"
        preprocessed_input.write_text(
            preprocess_markdown(*batch.paths, basedir=basedir),
            encoding="utf-8"
        )
        html = tempdir/"temp.html"
        cmd = build_command(preprocessed_input, str(html), basedir,
                            config.get("slipbox", "content_options"))
        retcode = utils.run_command(cmd, cwd=tempdir)
        if retcode:
            print("Scan failed.", file=sys.stderr)
            return
        process_csvs(conn, tempdir)
        store_html(conn, html.read_text(encoding="utf-8"), batch.paths)
        conn.commit()
