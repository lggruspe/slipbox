#!/usr/bin/env python3

from os.path import dirname, exists, join
import sys

from zettel.filenames import relative_backlink

def main():
    if len(sys.argv) != 3:
        print(f"Usage: {sys.argv[0]} path1 path2", file=sys.stderr)
        return
    path1, path2 = sys.argv[1:3]
    path = relative_backlink(path1, path2) or path1
    print(path if path and exists(join(dirname(path2), path)) else path1)

if __name__ == "__main__":
    main()
