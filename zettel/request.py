from .filenames import fix_path, relative_backlink

def _get_data(req, key, default=None):
    return req.get("data", {}).get(key, default)

def note(req):
    filename = _get_data(req, "filename")
    title = _get_data(req, "title")
    if not filename:
        return ("",)
    sql = """
        INSERT INTO notes (filename, title) VALUES (:filename, :title)
            ON CONFLICT (filename) DO UPDATE SET title = :title
    """
    params = {"filename": filename, "title": title}
    return sql, params

def link(req):
    src = _get_data(req, "src")
    original = _get_data(req, "dest")
    dest = fix_path(original, src)
    if not dest:
        return ("",)

    description = _get_data(req, "description")
    link = relative_backlink(dest, src)
    backlink = relative_backlink(src, dest)
    sql = """
        INSERT INTO links (src, dest, description, relative_link,
                relative_backlink, original_link)
            VALUES (:src, :dest, :description, :relative_link,
                    :relative_backlink, :original_link)
                ON CONFLICT (src, dest, original_link) DO UPDATE
                    SET description = description
    """
    params = {
        "src": src,
        "dest": dest,
        "description": description,
        "relative_link": link,
        "relative_backlink": backlink,
        "original_link": original,
    }
    return sql, params

def keyword(req):
    note = _get_data(req, "note")
    keyword = _get_data(req, "keyword")
    if not note or not keyword:
        return ("",)
    sql = """
        INSERT OR IGNORE INTO keywords (note, keyword)
            VALUES (:note, :keyword)
    """
    params = {"note": note, "keyword": keyword}
    return sql, params

def to_sql(req):
    t = req.get("type", "")
    if t == "note":
        return note(req)
    elif t == "link":
        return link(req)
    elif t == "keyword":
        return keyword(req)
    return ("",)
