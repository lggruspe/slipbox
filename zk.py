import sys
from zettel.build import build
from zettel.caps import *
from zettel.config import Config
from zettel.genin import generate_ninja
from zettel.graph import graph_folgezettels, graph_links
from zettel.scan import scan_zettels, show_missing

def main(config=Config()):
    db = arg("-d", "--database", type=str, default=config.user.database,
             help="zettel sqlite3 database filename (default={})".format(
                 repr(config.user.database)))
    host = arg("-H", "--host", type=str, default=config.host,
               help=f"host address (default={config.host!r})")
    port = arg("-p", "--port", type=int, default=config.port,
               help=f"port number (default={config.port!r})")
    output = arg("-o", "--output", type=str, default="build.ninja",
                 help="output ninja file (default='build.ninja')")
    pattern = arg("-p", "--pattern", type=str, default='%%',
                  help="filename SQL pattern (default='%%')")
    dot = arg("-o", "--output", type=str, dest="output", default=sys.stdout,
              help="output dot file (default=stdout)")
    cmd = Cmd(desc("zk", "Manage zettelkasten notes."),
              Cmd(scan_zettels, db, host, port, prog="scan"),
              Cmd(generate_ninja, db, output, prog="genin"),
              Cmd(show_missing, db, prog="missing"),
              Cmd(build, db, host, port, output),
              Cmd(graph_folgezettels, pattern, dot, prog="gfz"),
              Cmd(graph_links, pattern, dot, prog="graph"))
    cmd.run()

if __name__ == "__main__":
    main()
