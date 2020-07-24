"""Generate complete HTML containing all slipbox notes."""

import os
import shlex
import subprocess
import tempfile

from .templates import Elem, render
from .utils import make_temporary_file, write_lines

DUMMY_MARKDOWN = r"""$\,$
``` {.c style="display:none"}
```"""

def generate_active_htmls(conn):
    """Get HTML stored in the database for active sections."""
    sql = """
        SELECT body FROM Html WHERE id IN (SELECT html FROM Sections)
            ORDER BY id DESC
    """
    cur = conn.cursor()
    return map(lambda row: row[0], cur.execute(sql))

def generate_data(conn):
    """Generate slipbox data in javascript."""
    for nid, title in conn.execute("SELECT id, title FROM Notes ORDER BY id"):
        yield f"window.query.db.add(new Model.Note({nid}, {title!r}))"
    sql = "SELECT src, dest, annotation FROM ValidLinks"
    for src, dest, annotation in conn.execute(sql):
        yield f"""window.query.db.add(new Model.Link(
  window.query.note({src}), window.query.note({dest}), {annotation!r}))"""
    sql = "SELECT id, alias FROM ValidAliases ORDER BY id, alias"
    for nid, alias in conn.execute(sql):
        yield f"window.query.db.add(new Model.Alias({nid}, {alias!r}))"
    sql = "SELECT prev, next FROM Sequences ORDER BY prev, next"
    for prev, next_ in conn.execute(sql):
        yield f"window.query.db.add(new Model.Sequence({prev!r}, {next_!r}))"

def generate_javascript(conn):
    """Generate slipbox javascript code."""
    yield '<script type="module">'
    basedir = os.path.dirname(__file__)
    with open(os.path.join(basedir, "data/bundle.js")) as file:
        yield file.read().strip()
    yield '</script>'
    yield '<script type="text/javascript">'
    yield "window.addEventListener('DOMContentLoaded', () => {"
    yield from generate_data(conn)
    yield "window.initSlipbox()"
    yield "})"
    yield "</script>"

def create_bibliography(conn):
    """Create bibliography HTML section from database entries."""
    sql = "SELECT key, text FROM Bibliography ORDER BY key"
    items = []
    for key, text in conn.execute(sql):
        items.append(Elem("dt", Elem("a", f"[@{key[4:]}]", href='#' + key)))
        items.append(Elem("dd", text))
    section = Elem("section",
                   Elem("h1", "References"),
                   Elem("dl", *items),
                   id="references",
                   title="References",
                   **{"class": "level1"})
    return render(section)

def create_tags(conn):
    """Create HTML section that lists all tags."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    items = (Elem("li", Elem("a", tag, href=f"#{tag}")) for tag in tags)
    section = Elem("section",
                   Elem("h1", "Tags"),
                   Elem("ul", *items),
                   id="tags",
                   title="Tags",
                   **{"class": "level1"})
    return render(section)

def create_entrypoints(conn):
    """Create HTML section for entrypoints.

    This contains all notes that starts a sequence.
    """
    query = """
        SELECT id, title FROM Aliases JOIN Notes USING (id)
            WHERE CAST(id AS STRING) = alias
                ORDER BY title
    """
    entrypoints = conn.execute(query)
    items = (Elem("li", Elem("a", title, href=f"#{nid}"))
             for nid, title in entrypoints)
    section = Elem("section",
                   Elem("h1", "Entrypoints"),
                   Elem("ul", *items),
                   id="entrypoints",
                   title="Entrypoints",
                   **{"class": "level1"})
    return render(section)

def create_tag_page(conn, tag):
    """Create HTML section that lists all notes with the tag."""
    sql = """
        SELECT id, title FROM Tags NATURAL JOIN Notes WHERE tag = ? ORDER BY id
    """
    items = []
    for nid, title in conn.execute(sql, (tag,)):
        item = Elem("li", f"[{nid}] ", Elem("a", title, href=f"#{nid}"))
        items.append(item)
    section = Elem("section",
                   Elem("h1", Elem("a", tag, href="#tags", title="List of tags")),
                   Elem("ul", *items),
                   id=tag,
                   title=tag,
                   **{"class": "level1"})
    return render(section)

def create_tag_pages(conn):
    """Create all tag pages."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    return '\n'.join(create_tag_page(conn, tag) for tag in tags)

def create_reference_page(conn, reference):
    """Create HTML section that lists all notes that cite the reference."""
    sql = """
        SELECT note, title, text FROM Citations
            JOIN Notes ON Citations.note = Notes.id
                JOIN Bibliography ON Bibliography.key = Citations.reference
                    WHERE reference = ?
    """
    items = []
    text = ""
    for note, title, _text in conn.execute(sql, (reference,)):
        text = _text
        item = Elem("li", f"[{note}] ", Elem("a", title, href=f"#{note}"))
        items.append(item)
    section = Elem("section",
                   Elem("h1", Elem("a", '@' + reference[4:], href="#references")),
                   Elem("p", text),
                   Elem("ul", *items),
                   id=reference,
                   title=reference,
                   **{"class": "level1"})
    return render(section)

def create_reference_pages(conn):
    """Create all reference pages."""
    rows = conn.execute("SELECT key FROM Bibliography ORDER BY key")
    references = (row[0] for row in rows)
    return '\n'.join(create_reference_page(conn, ref) for ref in references)

def generate_complete_html(conn, options):
    """Create final HTML file with javascript."""
    with make_temporary_file() as script,\
            make_temporary_file(suffix=".html", text=True) as html,\
            make_temporary_file(suffix=".html", text=True) as extra,\
            tempfile.TemporaryDirectory() as tempdir:
        dummy = os.path.join(tempdir, "Slipbox.md")
        write_lines(dummy, [DUMMY_MARKDOWN])
        write_lines(script, generate_javascript(conn))
        write_lines(html, generate_active_htmls(conn))
        with open(extra, "w") as file:
            print(create_tag_pages(conn), file=file)
            print(create_tags(conn), file=file)
            print(create_reference_pages(conn), file=file)
            print(create_bibliography(conn), file=file)
            print(create_entrypoints(conn), file=file)
        cmd = "pandoc {dummy} -H{script} {title} -B{html} -B{extra} --section-divs {opts}".format(
            dummy=shlex.quote(dummy), script=shlex.quote(script),
            html=shlex.quote(html), opts=options, extra=shlex.quote(extra),
            title="--metadata title=Slipbox")
        subprocess.run(shlex.split(cmd), check=False)
