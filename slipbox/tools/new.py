"""Get available note ID."""

import itertools
import typing as t

from ..app import App, require_init


def missing_integers(integers: t.Sequence[int]) -> t.Iterator[int]:
    """Yield integers that are not in the input.

    Assume the integers in the input are sorted.
    """
    if integers:
        yield from range(1, integers[0])
        for i in range(1, len(integers)):
            assert integers[i-1] <= integers[i]
            yield from range(integers[i-1] + 1, integers[i])
    yield from itertools.count(1 if not integers else integers[-1] + 1)


def take(count: int, items: t.Iterable[t.Any]) -> t.Iterator[t.Any]:
    """Take 'count' items from 'items'."""
    return itertools.islice(items, count)


@require_init
def new_note(app: App) -> None:
    """Get unused note IDs."""
    count = app.args["n"]
    rows = app.database.execute("SELECT id FROM Notes ORDER BY (id)")
    ids = [row[0] for row in rows]
    suggest = take(max(1, count), missing_integers(ids))
    print(",".join(map(str, suggest)))
