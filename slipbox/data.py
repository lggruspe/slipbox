"""Show warning messages."""

import sys

def warning(message: str, *information: str) -> None:
    """Show warning message."""
    print(f"[WARNING] {message}", file=sys.stderr)
    for info in information:
        print(f"  {info}", file=sys.stderr)
