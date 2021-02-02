"""Static site generator for Zettelkasten notes."""

import sys
from .cli import cli
from .utils import check_requirements

if __name__ == "__main__":
    if not check_requirements():
        sys.exit("[ERROR] pandoc not found.")
    cli.run()
