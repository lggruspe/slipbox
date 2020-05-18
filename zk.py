from argparse import ArgumentParser

from zettel.caps import *
from zettel.config import Config
from zettel.genin import generate_ninja
from zettel.scan import scan_zettels, show_missing

def main(config=Config()):
    db_arg = arg("-d", "--database", type=str, default=config.user.database,
             help="zettel sqlite3 database filename (default={})".format(
                 repr(config.user.database)
             ))
    cmd = Cmd(
        desc("zk", "Manage zettelkasten notes."),
        Cmd(scan_zettels, db_arg,
            arg("-H", "--host", type=str, default=config.host,
                help=f"host address (default={config.host!r})"),
            arg("-p", "--port", type=int, default=config.port,
                help=f"port number (default={config.port!r})"),
            prog="scan", description="Scan zettels that have been modified."),
        Cmd(generate_ninja, db_arg, prog="genin",
            description="Generate ninja file for generating HTML."),
        Cmd(show_missing, db_arg, prog="missing",
            description="Show list of notes with no outline."))
    cmd.run()

if __name__ == "__main__":
    main()
