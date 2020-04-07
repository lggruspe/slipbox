import os.path as op

def is_in_subdir(path: str) -> bool:
    curdir = op.abspath(op.curdir)
    paths = [op.abspath(path), curdir]
    return op.commonpath(paths) == curdir

def fix_path(path: str, src: str) -> str or None:
    target = op.relpath(op.join(op.dirname(src), path), op.curdir)
    if op.exists(target) and is_in_subdir(target):
        return target
    if op.exists(path) and is_in_subdir(path):
        return path
    return None

def relative_backlink(src: str, dest: str) -> str or None:
    if not is_in_subdir(src) or not is_in_subdir(dest):
        return None
    return op.relpath(src, op.dirname(dest))

def main():
    import sys
    if len(sys.argv) < 3:
        return print(f"Usage: {sys.argv[0]} path src", file=sys.stderr)
    print(fix_path(sys.argv[1], sys.argv[2]))

if __name__ == "__main__":
    main()
