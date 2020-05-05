from argparse import ArgumentParser
import sys

class CmdTree:
    def __init__(self, description="", **subcommands):
        self.description = description
        self.subcommands = subcommands
        self.parser = ArgumentParser(description=description, add_help=False)
        self.parser.add_argument("subcommand", type=str,
                                choices=subcommands.keys())

    def get_subcommand(self, args=None):
        if args is None:
            args = sys.argv[1:]
        namespace, remaining = self.parser.parse_known_args(args)
        subcommand = self.subcommands.get(namespace.subcommand)
        if type(subcommand) == CmdTree:
            return subcommand.get_subcommand(remaining)
        return subcommand, remaining

foo = ArgumentParser(description="Run foo")
foo.add_argument("-x", type=int, default=0)

bar = ArgumentParser(description="Run bar")
bar.add_argument("-x", type=int, default=1)

baz = ArgumentParser(description="Run baz")
baz.add_argument("-x", type=int, default=2)

cmd = CmdTree(description="main", foo=foo, barbaz=CmdTree(description="barbaz", bar=bar, baz=baz))
parser, remaining = cmd.get_subcommand()

args = parser.parse_args(args=remaining)
print(args)
