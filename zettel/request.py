import re

def _sqlite_str(s):
    if not s:
        return "NULL"
    s = s.replace("'", "''")
    return f"'{s}'"

def _get_data(req, key, default=None):
    return req.get("data", {}).get(key, default)

def _get_str(req, key, default=None):
    return _sqlite_str(_get_data(req, key, default))

def note(req):
    sql = """
        INSERT INTO notes (filename, title)
            VALUES (@filename@, @title@)
    """
    filename = _get_str(req, "filename")
    title = _get_str(req, "title")
    return (sql.replace("@title@", title, 1)
            .replace("@filename@", filename, 1))

def link(req):
    sql = """
        INSERT INTO links (src, dest, description)
            VALUES (@src@, @dest@, @description@)
    """
    src = _get_str(req, "src")
    dest = _get_str(req, "dest")
    description = _get_str(req, "description")
    return (sql.replace("@description@", description, 1)
            .replace("@dest@", dest, 1)
            .replace("@src@", src, 1))

def keyword(req):
    sql = """
        INSERT INTO keywords (note, keyword)
            VALUES (@note@, @keyword@)
    """
    note = _get_str(req, "note")
    keyword = _get_str(req, "keyword")
    return (sql.replace("@keyword@", keyword, 1)
            .replace("@note@", note, 1))

def to_sql(req):
    t = req.get("type", "")
    if t == "note":
        return note(req)
    elif t == "link":
        return link(req)
    elif t == "keyword":
        return keyword(req)
    return ""
