import multiprocessing as mp
import subprocess as sp
from time import sleep
from .genin import generate_ninja
from .scan import scan_zettels

def build(database, host, port, output="build.ninja"):
    """Generate HTML files automatically."""
    # for some reason scan_zettels(database, host, port) alone doesn't write to
    # the database
    t = mp.Process(target=scan_zettels, args=(database, host, port))
    t.start()
    t.join()
    generate_ninja(database, output)
    sp.run(f"ninja -f {output}".split())
