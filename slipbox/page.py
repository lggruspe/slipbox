"""Generate complete HTML containing all slipbox notes."""

from pathlib import Path
import shlex
from sqlite3 import Connection
import subprocess
from typing import Iterable

from .templates import Elem, render
from .utils import pandoc, temporary_directory

DUMMY_MARKDOWN = r"""$\,$
``` {.c style="display:none"}
```
"""

def generate_active_htmls(conn: Connection) -> Iterable[str]:
    """Get HTML stored in the database for active sections."""
    sql = """
        SELECT body FROM Html WHERE id IN (SELECT html FROM Sections)
            ORDER BY id DESC
    """
    return (body for body, in conn.execute(sql))

def generate_data(conn: Connection) -> Iterable[str]:
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

def generate_javascript(conn: Connection) -> Iterable[str]:
    """Generate slipbox javascript code."""
    yield '<script type="module">'
    bundle = Path(__file__).parent/"data"/"bundle.js"
    yield bundle.read_text().strip()
    yield '</script>'
    yield '<script type="text/javascript">'
    yield "window.addEventListener('DOMContentLoaded', () => {"
    yield from generate_data(conn)
    yield "window.initSlipbox()"
    yield "})"
    yield "</script>"

def create_bibliography(conn: Connection) -> str:
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
                   style="display:none",
                   **{"class": "level1"})
    return render(section)

def create_tags(conn: Connection) -> str:
    """Create HTML section that lists all tags."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    items = (Elem("li", Elem("a", tag, href=f"#{tag}")) for tag in tags)
    section = Elem("section",
                   Elem("h1", "Tags"),
                   Elem("ul", *items),
                   id="tags",
                   title="Tags",
                   style="display:none",
                   **{"class": "level1"})
    return render(section)

def create_entrypoints(conn: Connection) -> str:
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
                   style="display:none",
                   **{"class": "level1"})
    return render(section)

def create_tag_page(conn: Connection, tag: str) -> str:
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
                   style="display:none",
                   **{"class": "level1"})
    return render(section)

def create_tag_pages(conn: Connection) -> str:
    """Create all tag pages."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    return '\n'.join(create_tag_page(conn, tag) for tag in tags)

def create_reference_page(conn: Connection, reference: str) -> str:
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
                   style="display:none",
                   **{"class": "level1"})
    return render(section)

def create_reference_pages(conn: Connection) -> str:
    """Create all reference pages."""
    rows = conn.execute("SELECT key FROM Bibliography ORDER BY key")
    references = (row[0] for row in rows)
    return '\n'.join(create_reference_page(conn, ref) for ref in references)

def generate_complete_html(conn: Connection, options: str) -> None:
    """Create final HTML file with javascript."""
    with temporary_directory() as tempdir:
        script = tempdir/"script.js"
        html = tempdir/"cached.html"
        extra = tempdir/"extra.html"
        dummy = tempdir/"Slipbox.md"
        dummy.write_text(DUMMY_MARKDOWN)
        script.write_text('\n'.join(generate_javascript(conn)))
        html.write_text('\n'.join(generate_active_htmls(conn)))
        with open(extra, "w") as file:
            print(create_tag_pages(conn), file=file)
            print(create_tags(conn), file=file)
            print(create_reference_pages(conn), file=file)
            print(create_bibliography(conn), file=file)
            print(create_entrypoints(conn), file=file)
        cmd = "{pandoc} {dummy} -H{script} {title} -B{html} -B{extra} --section-divs {opts}".format(
            pandoc=pandoc(), dummy=shlex.quote(str(dummy)), script=shlex.quote(str(script)),
            html=shlex.quote(str(html)), opts=options, extra=shlex.quote(str(extra)),
            title="--metadata title=Slipbox")
        subprocess.run(shlex.split(cmd), check=False)
