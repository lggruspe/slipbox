"""Look for files that must be compiled."""

from itertools import groupby
import fnmatch
import os
from pathlib import Path
import shlex
from sqlite3 import Connection
import sys
from typing import Iterable, List, Set, Tuple, Union

from . import utils
from .config import Config
from .preprocess import concatenate

def initialize_database(conn: Connection) -> None:
    """Initialize database with schema.sql."""
    sql = Path(__file__).with_name("schema.sql").read_text()
    conn.executescript(sql)
    conn.commit()

def fetch_files(conn: Connection) -> Iterable[Path]:
    """Get files from the database."""
    return (Path(p) for p, in conn.execute("SELECT filename FROM Files"))

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

def glob_files(paths: Iterable[Path]) -> Set[Path]:
    """Recursively glob files in every path in paths."""
    new_files: Set[Path] = set()
    for path in paths:
        if path.is_file():
            new_files.add(path)
        elif path.is_dir():
            new_files.update(filter(os.path.isfile, path.rglob('*')))
    return new_files

def find_new_files(
        conn: Connection,
        paths: Iterable[Path],
        patterns: Iterable[str] = ("*.md",)
    ) -> Iterable[Path]:
    """Look for files that are not yet in the database."""
    condition = lambda x: x.is_file() and not is_file_in_db(x, conn) and \
            has_valid_pattern(x, patterns)
    return filter(condition, glob_files(paths))

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
    js_filter = shlex.quote(str(Path(__file__).with_name("data").joinpath("filter.js")))
    cmd = f"{utils.pandoc()} -Fpandoc-citeproc -F{js_filter} --section-divs " \
            f"-Mlink-citations:true {options} " \
            "-o {} ".format(shlex.quote(output))
    return cmd + ' ' + str(input_)

def store_html_sections(conn: Connection, html: str, sources: List[Path]) -> None:
    """Insert Html and Sections entries for html and sources.

    html
    : HTML body text.
    sources
    : List of source files from which the html was generated.
    """
    if not html.strip() or not sources:
        return
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    cur.execute("INSERT INTO Html(body) VALUES (?)", (html,))
    lastrowid = cur.lastrowid
    query = "SELECT DISTINCT id FROM Notes WHERE filename IN ({})".format(
        ", ".join(utils.sqlite_string(str(source)) for source in sources))
    insert = "INSERT OR IGNORE INTO Sections(note, html) VALUES (?, ?)"
    cur2 = conn.cursor()
    for row in cur.execute(query):
        cur2.execute(insert, (row[0], lastrowid))

def process_batch(conn: Connection,
                  batch: List[Path],
                  config: Config = Config()) -> None:
    """Process batch of input notes."""
    convert_to_data_url = "1" if config.convert_to_data_url else ""
    with utils.temporary_directory() as tempdir:
        html = tempdir/"temp.html"
        preprocessed_input = tempdir/"input.md"
        concatenate(preprocessed_input, *batch)
        cmd = build_command(preprocessed_input, str(html), config.content_options)
        retcode = utils.run_command(cmd, SLIPBOX_TMPDIR=str(tempdir),
                                    CONVERT_TO_DATA_URL=convert_to_data_url,
                                    SLIPBOX_DB=str(config.database.resolve()))
        if retcode:
            print("Scan failed.", file=sys.stderr)
            return
        store_html_sections(conn, html.read_text(), batch)
        conn.commit()
