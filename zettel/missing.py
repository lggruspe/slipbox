from os.path import exists

def sqlite_string(s):
    t = s.replace("'", "''")
    return f"'{t}'"

def notes_in_db(conn):
    cur = conn.cursor()
    return (note[0] for note in cur.execute("SELECT filename FROM notes"))

def delete_missing_notes(conn):
    missing = filter(lambda note: not exists(note), notes_in_db(conn))
    args = ", ".join(map(sqlite_string, missing))
    cur = conn.cursor()
    cur.execute(f"DELETE FROM notes WHERE filename IN ({args})")
