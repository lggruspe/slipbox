def initialize(conn):
    cur = conn.cursor()
    cur.executescript("""
        PRAGMA foreign_keys = ON;

        CREATE TABLE notes (
            filename TEXT PRIMARY KEY,
            title TEXT
        );

        CREATE TABLE links (
            src TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            dest TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            description TEXT,
            PRIMARY KEY (src, dest)
        );

        CREATE TABLE keywords (
            note TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            keyword TEXT,
            PRIMARY KEY (note, keyword)
        );

        CREATE TABLE folgezettels (
            outline TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            note TEXT REFERENCES notes(filename) ON DELETE CASCADE,
            seqnum TEXT NOT NULL,
            PRIMARY KEY (outline, seqnum)
        );
    """)
    conn.commit()
