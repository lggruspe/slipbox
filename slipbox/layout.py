"""Graph layout cache."""

from concurrent.futures import Executor, Future, wait
import json
from sqlite3 import Connection
import typing as t

import networkx as nx   # type: ignore

from .serializer import serialize


# Maps note IDs to coordinates.
GraphLayout = t.Dict[int, t.Tuple[float, float]]


class LayoutCache:
    """Graph layout cache.

    The cache has two layers.

    1. Layouts saved in the `LayoutCache` table in the DB.
    2. `Future` graph layouts that are still being computed.

    The constructor takes a database connection and a
    `concurrent.futures.Executor` for graph layout computations.
    """

    def __init__(self, con: Connection, executor: Executor) -> None:
        # key: serialized graph (see serializer.py)
        self.cache: t.Dict[str, Future[GraphLayout]] = {}
        self.con = con
        self.executor = executor

    def _get_from_db(self, key: str) -> t.Optional[GraphLayout]:
        """Return cached graph layout from db."""
        sql = "SELECT layout FROM LayoutCache WHERE key = ?"

        cur = self.con.cursor()
        cur.execute(sql, (key,))
        row = cur.fetchone()
        if not row:
            return None

        cached = json.loads(row[0])
        return {int(k): v for k, v in cached.items()}

    def _get_from_memory(self, key: str) -> t.Optional[Future[GraphLayout]]:
        """Return cached future graph layout from in-memory cache."""
        return self.cache.get(key)

    def _save(self, key: str, value: GraphLayout) -> None:
        """Save key-value pair in LayoutCache.

        The key is the serialized graph and the value is the graph layout.
        Caller is expected to commit the changes.
        """
        sql = "INSERT OR REPLACE INTO LayoutCache (key, layout) VALUES (?, ?)"
        self.con.execute(sql, (key, json.dumps(value)))

        # Doesn't copy the key-value pair to the in-memory cache, but it
        # shouldn't be a problem, because the memory hierarchy is still
        # consistent.
        # It will be copied when the caller calls `LayoutCache.get`.

    def compute(
        self,
        key: str,
        graph: nx.DiGraph,
        layout: str = "fdp",
    ) -> Future[GraphLayout]:
        """Compute graph layout using graphviz.

        Expects a graph without self-loops.

        The key is the serialization of the graph.
        It can be computed from the graph, but it's included as a parameter to
        avoid reserialization.
        The caller should check the cache first before computing the graph
        layout, so the caller must already have the graph serialization before
        calling `LayoutCache.compute`.

        This method auto-saves the result in the database.

        Since computing graph layouts can be slow, this method computes the
        layout in a `concurrent.futures.Executor` and returns a
        `concurrent.futures.Future`.
        """
        # `nx.drawing.nx_pydot.graphviz_layout` is deprecated, but the
        # alternatives might cause installation issues :(
        task = nx.drawing.nx_pydot.graphviz_layout
        future = self.executor.submit(task, graph, prog=layout)
        future.add_done_callback(lambda f: self._save(key, f.result()))
        self.cache[key] = future
        return t.cast(Future[GraphLayout], future)

    def get(
        self,
        graph: nx.DiGraph,
        layout: str = "fdp",
    ) -> Future[GraphLayout]:
        """Return graph layout for the given graph.

        Expects the graph to have no self-loops.
        This method looks for the layout in the following locations and returns
        immediately when a result is found.

        1. in-memory cache (`self.cache`)
        2. `LayoutCache` table in the database
        3. Compute the graph layout using `graphviz`.
        """
        # Check in-memory cache.
        key = serialize(graph)
        future = self._get_from_memory(key)
        if future:
            return future

        # Check database.
        result = self._get_from_db(key)
        if result:
            future = t.cast(
                Future[GraphLayout],
                self.executor.submit(lambda x: x, result),
            )
            self.cache[key] = future
            return future

        # Compute graph layout.
        return self.compute(key, graph, layout)

    def wait(self) -> None:
        """Wait for all pending futures to resolve."""
        wait(self.cache.values())

    @property
    def is_done(self) -> bool:
        """Return `True` if all futures are done executing."""
        return all(future.done() for future in self.cache.values())
