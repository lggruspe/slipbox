#!/usr/bin/env python3

import sqlite3

from zettel.config import Config

def get_top_notes():
    """Get notes sorted by number of backlinks."""
    conn = sqlite3.connect(Config.database)
    cur = conn.cursor()
    cur.execute("""
        SELECT title, filename, count(*) FROM notes JOIN links ON filename = dest
            GROUP BY filename ORDER BY count(*) DESC
    """)
    rows = cur.fetchall()
    conn.close()
    return rows

def render_index(notes):
    page = "# Index\n\n"
    for note in notes:
        title, relpath, count = note
        backlink_s = "backlink"
        if count != 1:
            backlink_s += "s"
        page += f"- [{title}]({relpath}) ({count} {backlink_s})\n"
    return page

def main():
    """Generate index page of posts sorted by number of backlinks."""
    notes = get_top_notes()
    page = render_index(notes)
    print(page)

if __name__ == "__main__":
    main()
