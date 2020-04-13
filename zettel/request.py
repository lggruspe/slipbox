from .filenames import fix_path, relative_backlink

def delete_note():
    return """
        DELETE FROM notes WHERE filename = :filename
    """

def add_note():
    return """
        INSERT INTO notes (filename, title) VALUES (:filename, :title)
            ON CONFLICT (filename) DO UPDATE SET title = :title
    """

def add_link():
    return """
        INSERT INTO links (src, dest, description, relative_link,
                relative_backlink, original_link)
            VALUES (:src, :dest, :description, :relative_link,
                    :relative_backlink, :original_link)
                ON CONFLICT (src, dest, original_link) DO UPDATE
                    SET description = description
    """

def add_keyword():
    return """
        INSERT OR IGNORE INTO keywords (note, keyword)
            VALUES (:note, :keyword)
    """

def transform_note_params(params):
    return params

def transform_link_params(params):
    src = params.get("src")
    original = params.get("dest")
    dest = fix_path(original, src)
    if not dest:
        return None
    description = params.get("description")
    link = relative_backlink(dest, src)
    backlink = relative_backlink(src, dest)
    return {
        "src": src,
        "original_link": original,
        "dest": dest,
        "description": description,
        "relative_link": link,
        "relative_backlink": backlink,
    }

def transform_keyword_params(params):
    return params

def to_sql(req):
    t = req.get("type", "")
    if t == "note":
        return note(req)
    elif t == "link":
        return link(req)
    elif t == "keyword":
        return keyword(req)
    return ("",)
