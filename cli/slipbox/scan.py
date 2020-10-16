"""Look for files that must be compiled."""

from configparser import ConfigParser
from itertools import groupby
import fnmatch
import os
from pathlib import Path
import shlex
from sqlite3 import Connection
import sys
from typing import Iterable, List, Tuple, Union

from . import utils
from .data import process_csvs
from .preprocess import concatenate
from .secparse import parse_sections, SectionParser

def is_recently_modified(timestamp: float, filename: Union[Path, str]) -> bool:
    """Check if file has been modified after the timestamp."""
    return os.path.exists(filename) and os.path.getmtime(filename) >= timestamp

def is_file_in_db(path: Path, conn: Connection) -> bool:
    """Check if file is recorded in the database."""
    cur = conn.cursor()
    sql = "SELECT filename FROM Files WHERE filename = ?"
    for _ in cur.execute(sql, (str(path),)):
        return True
    return False

def has_valid_pattern(filename: Path, patterns: Iterable[str]) -> bool:
    """Check if filename matches one of the patterns."""
    for pattern in patterns:
        if fnmatch.fnmatch(str(filename), pattern):
            return True
    return False

def group_by_file_extension(files: Iterable[Path]) -> Iterable[Iterable[Path]]:
    """Generate an iterator for each file extension.

    Each file with no file extension is given its own iterator.
    """
    def key(filename: Union[str, Path]) -> Tuple[str, str]:
        root, ext = os.path.splitext(filename)
        return (ext, "") if ext else ("", root)
    groups = groupby(sorted(files, key=key), key=key)
    return map(lambda g: g[1], groups)

def build_command(input_: Path, output: str, options: str = "") -> str:
    """Construct a single pandoc command to run on inputs.

    inputs is a string of filenames separated by spaces.
    Each filename must be shlex.quoted if needed.
    Return an empty string if there are no input files.
    """
    assert input_.exists()
    data_dir = shlex.quote(str(Path(__file__).parent.resolve()))
    cmd = f"{utils.pandoc()} {options} -Lzk.lua --section-divs " \
            f"--data-dir={data_dir} -Mlink-citations:true " \
            "-o {} ".format(shlex.quote(output))
    return cmd + ' ' + shlex.quote(str(input_.resolve()))

def store_html_sections(conn: Connection, html: str, sources: List[Path]) -> None:
    """Insert HTML sections into Notes table."""
    if not html.strip() or not sources:
        return
    cur = conn.cursor()
    def callback(this: SectionParser) -> None:
        """Callback for parse_sections."""
        cur.execute("UPDATE Notes SET html = ? WHERE id = ?", (this.section, this.id_))
    parse_sections(html, callback)

def process_batch(conn: Connection,
                  batch: List[Path],
                  config: ConfigParser,
                  basedir: Path) -> None:
    """Process batch of input notes."""
    convert_to_data_url = "1" \
        if config.getboolean("slipbox", "convert_to_data_url") \
        else ""
    with utils.temporary_directory() as tempdir:
        html = tempdir/"temp.html"
        preprocessed_input = tempdir/"input.md"
        concatenate(preprocessed_input, *batch, basedir=basedir)
        cmd = build_command(preprocessed_input, str(html),
                            config.get("slipbox", "content_options"))
        retcode = utils.run_command(cmd, dict(SLIPBOX_TMPDIR=str(tempdir),
                                              CONVERT_TO_DATA_URL=convert_to_data_url),
                                    cwd=basedir)
        if retcode:
            print("Scan failed.", file=sys.stderr)
            return
        process_csvs(conn, tempdir)
        store_html_sections(conn, html.read_text(encoding="utf-8"), batch)
        conn.commit()
