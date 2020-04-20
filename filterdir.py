#!/usr/bin/env python3

from os.path import abspath, dirname, join

def main():
    path = abspath(join(dirname(__file__), "filters"))
    print(path)

if __name__ == "__main__":
    main()
