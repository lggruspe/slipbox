from argparse import ArgumentParser
from caps import CmdTree

foo = ArgumentParser(prog="foo", description="Run foo")
foo.add_argument("-x", type=int, default=0)

bar = ArgumentParser(prog="bar", description="Run bar")
bar.add_argument("-x", type=int, default=1)

baz = ArgumentParser(prog="baz", description="Run baz")
baz.add_argument("-x", type=int, default=2)

cmd = CmdTree(
    prog="main",
    description="Run main",
    foo=foo,
    barbaz=CmdTree(
        prog="barbaz",
        description="Run barbaz",
        bar=bar,
        baz=baz
    )
)

parser, remaining = cmd.get_subcommand()
args = parser.parse_args(args=remaining)
print(args)
