from argparse import ArgumentParser
from caps import CmdTree
import genin
import scan

cmd = CmdTree(
    prog="zk",
    description="Manage zettelkasten notes",
    scan=scan.argparser(),
    ninja=genin.argparser()
)

parser, remaining = cmd.get_subcommand()
args = parser.parse_args(args=remaining)
print(args)
print(parser.prog)
