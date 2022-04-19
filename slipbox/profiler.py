"""Tools for profiling code."""

import cProfile
from functools import wraps
import io
import pstats
import typing as t


AnyFn = t.Any


def profile(func: AnyFn) -> AnyFn:
    """Decorator that profiles function."""
    @wraps(func)
    def wrapper(*args: t.Any, **kwargs: t.Any) -> t.Any:
        profile = cProfile.Profile()
        profile.enable()

        result = func(*args, **kwargs)

        profile.disable()
        stream = io.StringIO()
        cumulative = pstats.SortKey.CUMULATIVE
        stats = pstats.Stats(profile, stream=stream).sort_stats(cumulative)
        stats.print_stats()
        print(stream.getvalue())
        return result
    return wrapper
