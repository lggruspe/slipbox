from argparse import ArgumentParser
from inspect import getfullargspec

def desc(name, doc):
    """Create empty function with given name and doc description."""
    def f():
        pass
    f.__name__ = name
    f.__doc__ = doc
    return f

def normalize(f):
    """Transform function to take an argparse.Namespace argument."""
    spec = getfullargspec(f)
    def wrapper(namespace):
        ns = vars(namespace)
        args = map(ns.get, spec.args)
        varargs = ns.get(spec.varargs, [])
        kwonlyargs = {k: ns.get(k) for k in spec.kwonlyargs}
        varkw = {k:v for k, v in ns.get(spec.varkw) or []}
        return f(*args, *varargs, **kwonlyargs, **varkw)
    return wrapper

def arg(*args, **kwargs):
    """Create function that adds arguments to arg parser/group."""
    return lambda x: x.add_argument(*args, **kwargs)

def grp(*args, title=None, description=None):
    """Create function that adds a group with arguments to a parser."""
    def f(parser):
        group = parser.add_argument_group(title=title, description=description)
        for arg in args:
            arg(group)
    return f

def mxg(*args, required=False):
    """Create function that adds a mutually exclusive group to a parser."""
    def f(parser):
        group = parser.add_mutually_exclusive_group(required=required)
        for arg in args:
            arg(group)
    return f

class Cmd:
    def __init__(self, func, *args, **kwargs):
        self.func = func
        self.args = args            # sub Cmds or args
        self.kwargs = kwargs.copy() # argparser constructor params
        if func.__name__ and "prog" not in self.kwargs:
            self.kwargs["prog"] = self.func.__name__
        if func.__doc__ and "description" not in self.kwargs:
            self.kwargs["description"] = self.func.__doc__

    def create(self, parent=None):
        """Create argparse.ArgumentParser."""
        if parent:
            parser = parent.add_parser(self.kwargs.get("prog"), **self.kwargs)
        else:
            parser = ArgumentParser(**self.kwargs)
        parser.set_defaults(_func=self.func)

        subparsers = None
        for arg in self.args:
            if type(arg) == Cmd:
                if not subparsers:
                    subparsers = parser.add_subparsers()
                arg.create(subparsers)
            else:
                arg(parser)
        return parser

    def get(self, args=None):
        """Get appropriate function and namespace object from parsed input."""
        parser = self.create()
        namespace = parser.parse_args(args)
        func = namespace._func
        del namespace._func
        return func, namespace

    def run(self, args=None):
        """Run function for parsed command and return result."""
        func, namespace = self.get(args)
        f = normalize(func)
        return f(namespace)
