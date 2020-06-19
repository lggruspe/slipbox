"""Look for files that must be compiled."""

from itertools import chain, groupby
import fnmatch
import glob
import os
import shlex
import tempfile

from . import utils

def initialize_database(conn):
    """Initialize database with schema.sql."""
    filename = os.path.join(os.path.dirname(__file__), "schema.sql")
    sql = utils.get_contents(filename)
    conn.executescript(sql)
    conn.commit()

def fetch_files(conn):
    """Get files from the database."""
    return (row[0] for row in conn.execute("SELECT filename FROM Files"))

def is_recently_modified(timestamp):
    """Create function that checks if a file has been modified since the given
    timestamp.
    """
    return lambda f: os.path.exists(f) and os.path.getmtime(f) >= timestamp

def is_file_in_db(filename, conn):
    """Check if file is recorded in the database."""
    cur = conn.cursor()
    sql = "SELECT filename FROM Files WHERE filename = ?"
    for _ in cur.execute(sql, (filename,)):
        return True
    return False

def has_valid_pattern(filename, patterns):
    """Check if filename matches one of the patterns."""
    for pattern in patterns:
        if fnmatch.fnmatch(filename, pattern):
            return True
    return False

def files_in_path(path):
    """Recursively glob files in path."""
    if os.path.isfile(path):
        yield path
    elif os.path.isdir(path):
        basedir = os.path.join(path, "**")
        yield from filter(os.path.isfile, glob.iglob(basedir, recursive=True))

def files_in_paths(paths):
    """Recursively glob files in every path in paths."""
    new_files = set()
    for path in paths:
        new_files = new_files.union(files_in_path(path))
    return new_files

def find_new_files(conn, paths, patterns=("*.md",)):
    """Look for files that are not yet in the database."""
    condition = lambda x: os.path.isfile(x) and not is_file_in_db(x, conn) and \
            has_valid_pattern(x, patterns)
    return filter(condition, map(os.path.normpath, files_in_paths(paths)))

def input_files(conn, timestamp, paths, patterns=("*.md",)):
    """Generate files that must be rescanned/processed by pandoc.

    Neighbor notes of deleted/modified files don't have to be rescanned,
    since those notes don't get affected when notes they reference to are
    removed from the database.
    """
    modified = map(os.path.normpath, filter(is_recently_modified(timestamp),
                                            fetch_files(conn)))
    new = find_new_files(conn, paths, patterns)
    yield from filter(os.path.isfile, set(modified).union(new))

def delete_files_from_database(conn, files):
    """Delete files from the database."""
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    for filename in files:
        cur.execute("DELETE FROM Files WHERE filename = ?", (filename,))
    conn.commit()

def run_script_on_database(conn, script):
    """Run script stored in file on database."""
    with open(script) as file:
        cur = conn.cursor()
        for line in file:
            cur.execute(line)
        conn.commit()

def group_by_file_extension(files):
    """Generate an iterator for each file extension.

    Each file with no file extension is given its own iterator.
    """
    def key(filename):
        root, ext = os.path.splitext(filename)
        return (ext, "") if ext else ("", root)
    groups = groupby(sorted(files, key=key), key=key)
    return map(lambda g: g[1], groups)

def build_command(files, output, options=""):
    """Construct a single pandoc command to run on input files.

    Return an empty string if there are no input files.
    """
    datadir = shlex.quote(os.path.abspath(os.path.dirname(__file__)))
    cmd = f"pandoc -Lzk.lua -Fpandoc-citeproc -Lrefs.lua --section-divs "\
            f"--data-dir {datadir} -Mlink-citations:true {options} "\
            "-o {} ".format(shlex.quote(output))
    empty = True
    for filename in files:
        empty = False
        cmd += " {}".format(shlex.quote(filename))
    return cmd if not empty else ""

def grouped_build_commands(files, options=""):
    """Construct pandoc commands to run on input files."""
    assert "" not in files
    commands = []
    for group in group_by_file_extension(files):
        _, output = tempfile.mkstemp(suffix=".html", text=True)
        cmd = build_command(group, output, options)
        if cmd:
            commands.append((cmd, output))
        else:
            os.remove(output)
    return commands

def remove_outdated_files_from_database(conn, timestamp):
    """Remove outdated files from the database.

    This includes files that have been deleted from the file system, and files
    that have recently been modified.
    The second set of files will be added back to the database after scanning.
    """
    missing = filter(lambda x: not os.path.exists(x), fetch_files(conn))
    modified = filter(is_recently_modified(timestamp), fetch_files(conn))
    return delete_files_from_database(conn, map(os.path.normpath,
                                                chain(missing, modified)))

def store_html_sections(conn, html: str, sources: [str]):
    """Insert Html and Sections entries for html and sources.

    html
    : HTML body text.
    sources
    : List of source files from which the html was generated.
    """
    if not html or not sources:
        return
    cur = conn.cursor()
    cur.execute("PRAGMA foreign_keys=ON")
    cur.execute("INSERT INTO Html(body) VALUES (?)", (html,))
    lastrowid = cur.lastrowid
    query = "SELECT DISTINCT id FROM Notes WHERE filename IN ({})".format(
        ", ".join(map(utils.sqlite_string, sources)))
    insert = "INSERT OR IGNORE INTO Sections(note, html) VALUES (?, ?)"
    cur2 = conn.cursor()
    for row in cur.execute(query):
        cur2.execute(insert, (row[0], lastrowid))
    conn.commit()

def scan(conn, inputs, scan_options):
    """Process inputs and store results in database."""
    for cmd, temp in grouped_build_commands(inputs, scan_options):
        with utils.make_temporary_file() as slipbox_sql:
            utils.run_command(cmd, SLIPBOX_SQL=slipbox_sql)
            run_script_on_database(conn, slipbox_sql)
            contents = utils.get_contents(temp)
        store_html_sections(conn, contents, inputs)
        os.remove(temp)
