from argparse import ArgumentParser

from zettel.caps import CmdTree
from zettel.config import Config, UserConfig
from zettel.scan import scan_zettels
import genin

def scan_cli(config=Config()):
    description = "Scan zettels that have been modified."
    parser = ArgumentParser(prog="scan", description=description)
    parser.add_argument("-H", "--host", type=str, default=config.host,
                        help=f"host address (default={config.host!r})")
    parser.add_argument("-p", "--port", type=int, default=config.port,
                        help=f"port number (default={config.port!r})")
    return parser

def main(config=Config()):
    cmd = CmdTree(
        "zk",
        "Manage zettelkasten notes",
        scan_cli(config),
        genin.argparser(config)
    )
    parser, args = cmd.get_subcommand()
    config = Config()
    if parser.prog == "scan":
        parser.parse_args(args=args, namespace=config)
        scan_zettels(config)
    elif parser.prog == "genin":
        parser.parse_args(args=args, namespace=config.user)
        genin.main(config)

if __name__ == "__main__":
    main()
