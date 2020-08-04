"""Build HTML from all notes in slipbox."""

from argparse import ArgumentParser, Namespace
import os
import sqlite3
import sys

from .page import generate_complete_html
from .scan import scan, remove_outdated_files_from_database, input_files
from .scan import initialize_database
from .utils import check_requirements

def main(args: Namespace) -> None:
    """Generate HTML file from input files."""
    timestamp = 0.0
    if os.path.exists(args.database):
        timestamp = os.path.getmtime(args.database)
    with sqlite3.connect(args.database) as conn:
        initialize_database(conn)
        remove_outdated_files_from_database(conn, timestamp)
        inputs = list(input_files(conn, timestamp, args.paths, args.patterns))
        scan(conn, inputs, args.content_options, args.convert_to_data_url)
        generate_complete_html(conn, args.document_options)

if __name__ == "__main__":
    if not check_requirements():
        sys.exit("[ERROR] pandoc and grep not found.")
    parser = ArgumentParser(
        description="Generate a single-page HTML from your notes.")
    parser.add_argument("database", help="filename of sqlite3 database")
    parser.add_argument("paths", nargs='+',
                        help="list of files or directories that contain notes")
    parser.add_argument("-p", "--patterns", nargs='*', default=["*.md"],
                        help="list of glob patterns")
    parser.add_argument("-c", "--content-options", default="",
                        help="pandoc options for the content")
    parser.add_argument("-d", "--document-options", default="",
                        help="pandoc options for the final HTML output")
    parser.add_argument("--convert-to-data-url", action="store_true",
                        help="convert local image links to data URL")
    main(parser.parse_args())
