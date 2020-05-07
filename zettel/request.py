from .filenames import fix_path, relative_backlink

def delete_note_keywords():
    return "DELETE FROM keywords WHERE note = :note"

def delete_note_links():
    return "DELETE FROM links WHERE src = :src"

def delete_note_sequences():
    return "DELETE FROM sequences WHERE outline = :outline"

def add_note():
    return """
        INSERT INTO notes (filename, title) VALUES (:filename, :title)
            ON CONFLICT (filename) DO UPDATE SET title = :title
    """

def add_link():
    return """
        INSERT INTO links (src, dest, description, relative_backlink)
            VALUES (:src, :dest, :description, :relative_backlink)
                ON CONFLICT (src, dest) DO UPDATE
                    SET description = description
    """

def add_keyword():
    return """
        INSERT OR IGNORE INTO keywords (note, keyword)
            VALUES (:note, :keyword)
    """

def add_sequence():
    return """
        INSERT INTO sequences (prev, next, outline)
            VALUES (:prev, :next, :outline)
    """

def transform_link_params(params):
    src = params.get("src")
    dest = fix_path(params.get("dest"), src)
    if not dest:
        return None
    description = params.get("description")
    backlink = relative_backlink(src, dest)
    return {
        "src": src,
        "dest": dest,
        "description": description,
        "relative_backlink": backlink,
    }

def transform_sequence_params(params):
    outline = params.get("outline")
    prev_note = fix_path(params.get("prev"), outline)
    next_note = fix_path(params.get("next"), outline)
    if not prev_note or not next_note:
        return None
    return {
        "prev": prev_note,
        "next": next_note,
        "outline": outline,
    }

def to_sql(req):
    t = req.get("type", "")
    if t == "note":
        return note(req)
    elif t == "link":
        return link(req)
    elif t == "keyword":
        return keyword(req)
    return ("",)
