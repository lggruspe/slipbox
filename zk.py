from caps import CmdTree
from zettel.config import Config, UserConfig
import genin
import scan

def main(config=Config()):
    cmd = CmdTree(
        prog="zk",
        description="Manage zettelkasten notes",
        scan=scan.argparser(config),
        genin=genin.argparser(config)
    )
    parser, args = cmd.get_subcommand()
    config = Config()
    if parser.prog == "scan":
        parser.parse_args(args=args, namespace=config)
        scan.main(config)
    elif parser.prog == "genin":
        parser.parse_args(args=args, namespace=config.user)
        genin.main(config)

if __name__ == "__main__":
    main()
