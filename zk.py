from argparse import ArgumentParser

from zettel.caps import CmdTree
from zettel.config import Config, UserConfig
from zettel.genin import generate_ninja
from zettel.scan import scan_zettels, show_missing

def scan_cli(config=Config()):
    description = "Scan zettels that have been modified."
    parser = ArgumentParser(prog="scan", description=description)
    parser.add_argument("-H", "--host", type=str, default=config.host,
                        help=f"host address (default={config.host!r})")
    parser.add_argument("-p", "--port", type=int, default=config.port,
                        help=f"port number (default={config.port!r})")
    return parser

def genin_cli(config=Config()):
    description = "Generate ninja file for generating HTML from zettels."
    parser = ArgumentParser(prog="genin", description=description)
    help_msg = "zettel sqlite3 database filename (default={})".format(
        repr(config.user.database)
    )
    parser.add_argument("-d", "--database", type=str,
                        default=config.user.database, help=help_msg)
    return parser

def missing_cli(config=Config()):
    description = "Show list of notes with no outline."
    parser = ArgumentParser(prog="missing", description=description)
    return parser

def main(config=Config()):
    cmd = CmdTree(
        "zk",
        "Manage zettelkasten notes",
        scan_cli(config),
        genin_cli(config),
        missing_cli(config)
    )
    parser, args = cmd.get_subcommand()
    if parser.prog == "scan":
        parser.parse_args(args=args, namespace=config)
        scan_zettels(config)
    elif parser.prog == "genin":
        parser.parse_args(args=args, namespace=config.user)
        generate_ninja(config)
    elif parser.prog == "missing":
        parser.parse_args(args=args, namespace=config)
        show_missing(config)

if __name__ == "__main__":
    main()
