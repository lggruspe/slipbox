def metadata(**kwargs):
    option = ""
    for k, v in kwargs.items():
        option += f"-M {k}:{v} "
    return option

def lua_filter(*args):
    option = ""
    for arg in args:
        option += f"--lua-filter=filters/{arg} "
    return option

def pandoc_filter(*args):
    option = ""
    for arg in args:
        option += f"--filter={arg} "
    return option

def bibliography(filename):
    return f"--bibliography={filename}"

def pandoc(*args):
    cmd = ["pandoc"]
    for arg in args:
        cmd.extend(a for a in arg.split(' ') if a)
    return cmd
