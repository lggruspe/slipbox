from argparse import ArgumentParser
import sys

class CmdTree:
    def __init__(self, prog, description="", **subcommands):
        self.prog = prog
        self.description = description
        self.subcommands = subcommands
        self.parser = ArgumentParser(description=description, add_help=False)
        self.parser.add_argument("subcommand", type=str,
                                choices=subcommands.keys() | ["help"])

    def get_subcommand(self, args=None):
        if args is None:
            args = sys.argv[1:]
        if args and args[0] == "help":
            self.parser.print_usage()
            print(f"\n{self.description}\n")
            print("subcommands:\n")
            for k, v in self.subcommands.items():
                print(k + "\n\t" + v.description)
            if "help" not in self.subcommands:
                print("help\n\tShow this help message and exit.")
            sys.exit()
        namespace, remaining = self.parser.parse_known_args(args)
        subcommand = self.subcommands.get(namespace.subcommand)
        if type(subcommand) == CmdTree:
            return subcommand.get_subcommand(remaining)
        return subcommand, remaining
