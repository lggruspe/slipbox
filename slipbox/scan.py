"""Look for files that must be compiled."""

from itertools import chain, groupby
import fnmatch
import os
from pathlib import Path
import shlex
from sqlite3 import Connection
import sys
from typing import Iterable, List, Set, Tuple, Union

from . import utils

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

def files_in_path(path: Path) -> Iterable[Path]:
    """Recursively glob files in path."""
    if path.is_file():
        yield path
    elif path.is_dir():
        yield from filter(os.path.isfile, path.rglob('*'))

def files_in_paths(paths: Iterable[Path]) -> Set[Path]:
    """Recursively glob files in every path in paths."""
    new_files: Set[Path] = set()
    for path in paths:
        new_files = new_files.union(files_in_path(path))
    return new_files

def find_new_files(
        conn: Connection,
        paths: Iterable[Path],
        patterns: Iterable[str] = ("*.md",)
    ) -> Iterable[Path]:
    """Look for files that are not yet in the database."""
    condition = lambda x: x.is_file() and not is_file_in_db(x, conn) and \
            has_valid_pattern(x, patterns)
    return filter(condition, files_in_paths(paths))

def input_files(
        conn: Connection,
        timestamp: float,
        paths: Iterable[str],
        patterns: Iterable[str] = ("*.md",)
    ) -> Iterable[Path]:
    """Generate files that must be rescanned/processed by pandoc.

    Neighbor notes of deleted/modified files don't have to be rescanned,
    since those notes don't get affected when notes they reference to are
    removed from the database.
    """
    files = lambda: fetch_files(conn)
    modified = (p for p in files() if is_recently_modified(timestamp, p))
    new = find_new_files(conn, map(Path, paths), patterns)
    yield from filter(os.path.isfile, set(modified).union(new))

def group_by_file_extension(files: Iterable[Path]) -> Iterable[Iterable[Path]]:
    """Generate an iterator for each file extension.

    Each file with no file extension is given its own iterator.
    """
    def key(filename: Union[str, Path]) -> Tuple[str, str]:
        root, ext = os.path.splitext(filename)
        return (ext, "") if ext else ("", root)
    groups = groupby(sorted(files, key=key), key=key)
    return map(lambda g: g[1], groups)

def build_command(inputs: str, output: str, options: str = "") -> str:
    """Construct a single pandoc command to run on inputs.

    inputs is a string of filenames separated by spaces.
    Each filename must be shlex.quoted if needed.
    Return an empty string if there are no input files.
    """
    if not inputs.strip():
        return ""
    datadir = shlex.quote(str(Path(__file__).parent.resolve()))
    cmd = f"{utils.pandoc()} -Lzk.lua -Fpandoc-citeproc -Lrefs.lua --section-divs " \
            f"--data-dir {datadir} -Mlink-citations:true {options} " \
            "-o {} ".format(shlex.quote(output))
    return cmd + ' ' + inputs

def remove_outdated_files_from_database(conn: Connection, timestamp: float) -> None:
    """Remove outdated files from the database.

    This includes files that have been deleted from the file system,
    and files that have been modified recently.
    Recently modified files will be added back to the database after scanning.
    """
    files = lambda: fetch_files(conn)
    missing = (p for p in files() if not p.exists())
    modified = (p for p in files() if is_recently_modified(timestamp, p))

    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    for filename in chain(missing, modified):
        cur.execute("DELETE FROM Files WHERE filename = ?", (str(filename),))
    conn.commit()

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
    conn.commit()

def scan(conn: Connection, inputs: List[Path], scan_options: str, self_contained: bool) -> None:
    """Process inputs and store results in database."""
    convert_to_data_url = "1" if self_contained else ""
    for batch in group_by_file_extension(inputs):
        files = list(batch)
        scan_input_list = " ".join(shlex.quote(str(p)) for p in files)

        with utils.temporary_directory() as tempdir:
            slipbox_sql = tempdir/"slipbox.sql"
            html = tempdir/"temp.html"
            cmd = build_command(scan_input_list, str(html), scan_options)
            proc = utils.run_command(cmd, SLIPBOX_SQL=str(slipbox_sql),
                                     CONVERT_TO_DATA_URL=convert_to_data_url,
                                     GREP=utils.grep(),
                                     SCAN_INPUT_LIST=scan_input_list)
            if proc.stdout:
                print(proc.stdout.decode())
            if proc.stderr:
                print(proc.stderr.decode(), file=sys.stderr)
            if proc.returncode:
                print("Scan failed.", file=sys.stderr)
                continue
            conn.executescript(slipbox_sql.read_text())
            conn.commit()
            contents = html.read_text()
        store_html_sections(conn, contents, inputs)
