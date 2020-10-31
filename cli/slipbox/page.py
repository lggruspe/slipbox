"""Generate complete HTML containing all slipbox notes."""

from pathlib import Path
import shlex
from sqlite3 import Connection
import subprocess
from typing import Iterable

from .templates import Elem, render
from .utils import pandoc, temporary_directory

DUMMY_MARKDOWN = r"""::: {style="display:none"}
$\,$
```c
```
:::"""

def generate_active_htmls(conn: Connection) -> Iterable[str]:
    """Get HTML stored in the database for active sections."""
    sql = "SELECT html FROM Notes WHERE html IS NOT NULL ORDER BY id ASC"
    return (html.strip() for html, in conn.execute(sql))

def generate_data(conn: Connection) -> Iterable[str]:
    """Generate slipbox data in javascript."""
    for nid, title, filename in conn.execute("SELECT id, title, filename FROM Notes ORDER BY id"):
        yield f"window.query.db.add(new Model.Note({nid}, {title!r}, {filename!r}))"
    sql = "SELECT src, dest, tag FROM ValidLinks"
    for src, dest, tag in conn.execute(sql):
        tag = "null" if not tag else repr(tag)
        yield f"""window.query.db.add(new Model.Link(
  window.query.note({src}), window.query.note({dest}), {tag}))"""

def generate_javascript(conn: Connection) -> Iterable[str]:
    """Generate slipbox javascript code."""
    yield '<script type="module">'
    bundle = Path(__file__).parent/"data"/"frontend.js"
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
                        ORDER BY note
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

def generate_complete_html(conn: Connection, options: str, basedir: Path) -> None:
    """Create final HTML file with javascript."""
    with temporary_directory() as tempdir:
        script = tempdir/"script.js"
        html = tempdir/"cached.html"
        extra = tempdir/"extra.html"
        dummy = tempdir/"Slipbox.md"
        dummy.write_text(DUMMY_MARKDOWN, encoding="utf-8")
        script.write_text('\n'.join(generate_javascript(conn)), encoding="utf-8")
        html.write_text('\n'.join(generate_active_htmls(conn)), encoding="utf-8")
        with open(extra, "w", encoding="utf-8") as file:
            print(create_tag_pages(conn), file=file)
            print(create_tags(conn), file=file)
            print(create_reference_pages(conn), file=file)
            print(create_bibliography(conn), file=file)
        cmd = "{pandoc} {dummy} -H{script} {title} -B{html} -B{extra} --section-divs {opts}".format(
            pandoc=pandoc(), dummy=shlex.quote(str(dummy)), script=shlex.quote(str(script)),
            html=shlex.quote(str(html)), opts=options, extra=shlex.quote(str(extra)),
            title="--metadata title=Slipbox")
        subprocess.run(shlex.split(cmd), check=False, cwd=basedir)
