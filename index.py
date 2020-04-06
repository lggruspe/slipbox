#!/usr/bin/env python3

import sqlite3

from zettel.config import Config

def get_top_notes():
    """Get notes sorted by number of backlinks."""
    conn = sqlite3.connect(Config.database)
    cur = conn.cursor()
    cur.execute("""
        SELECT filename FROM notes JOIN links ON filename = dest
            GROUP BY filename ORDER BY count(*) DESC
    """)
    rows = cur.fetchall()
    conn.close()
    return rows

def main():
    """Generate index page of posts sorted by number of backlinks."""
    notes = get_top_notes()

if __name__ == "__main__":
    main()
