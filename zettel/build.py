import subprocess as sp
from time import sleep
from .genin import generate_ninja
from .scan import scan_zettels

def build(database, host, port, output="build.ninja"):
    """Generate HTML files automatically."""
    scan_zettels(database, host, port)
    sleep(1)
    generate_ninja(database, output)
    sp.run(f"ninja -f {output}".split())
