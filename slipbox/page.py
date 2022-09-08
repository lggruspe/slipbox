"""Generate complete HTML containing all slipbox notes."""
# pylint: disable=consider-using-f-string

from pathlib import Path
import shlex
from sqlite3 import Connection
import subprocess
import typing as t

from pyquery import PyQuery as pq  # type: ignore

from .app import App
from .templates import Elem, render, render_template
from .utils import temporary_directory


def render_dummy(title: str) -> str:
    """Render dummy markdown."""
    return fr"""---
title: {title}
...

::: {{style="display:none"}}
```c
```
:::
"""


class Note(t.NamedTuple):
    """Data needed to render list of notes."""
    id: int
    title_html: str


def note_list_item(note: Note) -> str:
    """Return slipbox-list item HTML for given note."""
    html = render_template("list__item.html", id=note.id, html=note.title_html)
    return html.rstrip()


def note_list(notes: t.Iterable[Note]) -> str:
    """Render slipbox-list HTML for given notes."""
    items = map(note_list_item, sorted(notes))
    return render_template("list.html", items="\n".join(items)).rstrip()


def get_section_title(html: str) -> str:
    """Get innerHTML of section title."""
    assert html is not None
    doc = pq(html)
    header = doc("h1")
    return t.cast(str, header.html())


def render_home(conn: Connection, title: str) -> str:
    """Create home page HTML section containing a list of all notes."""
    notes = (
        Note(id_, get_section_title(html))
        for id_, html in conn.execute("SELECT id, html FROM Notes")
    )
    list_ = note_list(notes)
    return render_template("home.html", title=title, list=list_)


def generate_active_htmls(conn: Connection) -> t.Iterable[str]:
    """Get HTML stored in the database for active sections."""
    sql = "SELECT html FROM Notes WHERE html IS NOT NULL ORDER BY id ASC"
    return (html.strip() for html, in conn.execute(sql))


def render_references(conn: Connection) -> str:
    """Create bibliography HTML section from database entries."""
    sql = "SELECT key, html FROM Bibliography ORDER BY key"
    items = '\n'.join(
        render_template("bibliography__item.html", **dict(
            href=f"#{key}", term=f"[@{key[4:]}]", description=html
        )).strip()
        for key, html in conn.execute(sql)
    )
    return render_template("bibliography.html", items=items)


def render_untagged(con: Connection) -> str:
    """Render HTML for list of untagged notes."""
    rows = con.execute("SELECT id, html FROM Untagged")
    notes = list(
        Note(id_, get_section_title(html))
        for id_, html in rows
    )
    if not notes:
        return ""
    return render_template("untagged.html", notes=note_list(notes))


def render_tags(conn: Connection) -> str:
    """Create HTML section that lists all tags.

    Also list untagged notes.

    Note: notes without a tag but are connected to a tagged note are considered
    "weakly tagged".
    """
    rows = conn.execute(
        "SELECT tag, COUNT(*) FROM Tags GROUP BY tag ORDER BY tag"
    )
    tags = (
        f'<li><a href="#tags/{tag[1:]}">{tag}</a> ({count})</li>'
        for tag, count in rows
    )
    return render_template(
        "tags.html",
        tags="\n".join(tags),
        untagged=render_untagged(conn),
    )


def render_tag_page(conn: Connection, tag: str) -> str:
    """Create HTML section that lists all notes with the tag."""
    sql = """
        SELECT id, html FROM Tags NATURAL JOIN Notes WHERE tag = ? ORDER BY id
    """
    notes = (
        Note(id_, get_section_title(html))
        for id_, html in conn.execute(sql, (tag,))
    )
    section = Elem("section",
                   Elem("h1", tag),
                   note_list(notes),
                   id=f"tags/{tag[1:]}",
                   title=tag,
                   **{"class": "level1"})
    return render(section)


def render_tag_pages(conn: Connection) -> str:
    """Create all tag pages."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    return '\n'.join(render_tag_page(conn, tag) for tag in tags)


def render_reference_page(conn: Connection, reference: str) -> str:
    """Create HTML section that lists all notes that cite the reference."""
    sql = """
        SELECT note, Bibliography.html,Notes.html FROM Citations
            JOIN Notes ON Citations.note = Notes.id
                JOIN Bibliography ON Bibliography.key = Citations.reference
                    WHERE reference = ?
                        ORDER BY note
    """
    notes = []
    text = ""
    for note, _text, html in conn.execute(sql, (reference,)):
        assert not text or text == _text
        text = _text
        notes.append(Note(note, get_section_title(html)))
    section = Elem("section",
                   Elem("h1", '@' + reference[4:]),
                   Elem("p", text),
                   note_list(notes),
                   id=reference,
                   title=reference,
                   **{"class": "level1"})
    return render(section)


def render_reference_pages(conn: Connection) -> str:
    """Create all reference pages."""
    rows = conn.execute("SELECT key FROM Bibliography ORDER BY key")
    references = (row[0] for row in rows)
    return '\n'.join(render_reference_page(conn, ref) for ref in references)


def render_main(conn: Connection, title: str = "Slipbox") -> str:
    """Main content of index.html."""
    return render_template(
        "main.html",
        nav=render_template("nav.html"),
        home=render_home(conn, title),
        sections="\n".join(generate_active_htmls(conn)),
        tag_pages=render_tag_pages(conn),
        tags=render_tags(conn),
        reference_pages=render_reference_pages(conn),
        references=render_references(conn),
    )


def _write(path: Path, text: str) -> None:
    """Write text to file in path."""
    path.write_text(text, encoding="utf-8")


def generate_index(app: App, out: Path) -> None:
    """Create final HTML file with javascript."""
    con = app.database
    options = "-s"
    title = app.config.title

    with temporary_directory() as tempdir:
        _write(tempdir/"header.txt", render_template("header.html"))
        _write(tempdir/"Slipbox.md", render_dummy(title))
        _write(tempdir/"after.txt", render_main(con, title))

        cmd = """{pandoc} Slipbox.md -Hheader.txt --metadata title:{title}
                -Aafter.txt --section-divs {opts} -o {output} -c slipbox.css
            """.format(
            pandoc=app.config.pandoc,
            title=shlex.quote(title),
            opts=options,
            output=shlex.quote(str(out/"index.html")))
        subprocess.run(shlex.split(cmd), check=False, cwd=tempdir)
