"""Generate complete HTML containing all slipbox notes."""

from pathlib import Path
import shlex
from sqlite3 import Connection
import subprocess
import typing as t

from pyquery import PyQuery as pq  # type: ignore

from .templates import Elem, render, render_template
from .utils import pandoc, temporary_directory


def render_dummy(title: str) -> str:
    """Render dummy markdown."""
    return fr"""---
title: {title}
...

::: {{style="display:none"}}
$\,$
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


def create_home_page(conn: Connection, title: str) -> str:
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


def create_bibliography(conn: Connection) -> str:
    """Create bibliography HTML section from database entries."""
    sql = "SELECT key, text FROM Bibliography ORDER BY key"
    items = '\n'.join(
        render_template("bibliography__item.html", **dict(
            href=f"#{key}", term=f"[@{key[4:]}]", description=text
        ))
        for key, text in conn.execute(sql)
    )
    return render_template("bibliography.html", items=items)


def create_tags(conn: Connection) -> str:
    """Create HTML section that lists all tags.

    Also list untagged notes.

    Note: notes without a tag but are connected to a tagged note are considered
    "weakly tagged".
    """
    rows = conn.execute(
        "SELECT tag, COUNT(*) FROM Tags GROUP BY tag ORDER BY tag"
    )
    items = (Elem("li", Elem("a", tag, href=f"#tags/{tag[1:]}"), f" ({count})")
             for tag, count in rows)
    section = Elem("section",
                   Elem("h1", "Tags"),
                   Elem("ul", *items),
                   id="tags",
                   title="Tags",
                   **{"class": "level1"})
    untagged = list(
        Note(id_, get_section_title(html))
        for id_, html in conn.execute("SELECT id, html FROM Untagged")
    )
    if untagged:
        section.children.append(Elem("h2", "Untagged notes"))
        section.children.append(note_list(untagged))
    return render(section)


def create_tag_page(conn: Connection, tag: str) -> str:
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


def create_tag_pages(conn: Connection) -> str:
    """Create all tag pages."""
    rows = conn.execute("SELECT DISTINCT tag FROM Tags ORDER BY tag")
    tags = (row[0] for row in rows)
    return '\n'.join(create_tag_page(conn, tag) for tag in tags)


def create_reference_page(conn: Connection, reference: str) -> str:
    """Create HTML section that lists all notes that cite the reference."""
    sql = """
        SELECT note, text, html FROM Citations
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


def create_reference_pages(conn: Connection) -> str:
    """Create all reference pages."""
    rows = conn.execute("SELECT key FROM Bibliography ORDER BY key")
    references = (row[0] for row in rows)
    return '\n'.join(create_reference_page(conn, ref) for ref in references)


def generate_header() -> t.Iterable[str]:
    """Generate stuff to put in HTML header."""
    yield '<link rel="stylesheet"' \
        'href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace' \
        '@2.0.0-beta.70/dist/themes/light.css">'
    yield '<script type="module"' \
        'src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace' \
        '@2.0.0-beta.70/dist/shoelace.js">' \
        '</script>'
    yield '<script type="module" src="app.js"></script>'


def generate_complete_html(conn: Connection,
                           options: str,
                           out: Path,
                           title: str = "Slipbox") -> None:
    """Create final HTML file with javascript."""
    with temporary_directory() as tempdir:
        header = tempdir/"header.txt"
        header.write_text('\n'.join(generate_header()), encoding="utf-8")

        with open(tempdir/"after.txt", "a", encoding="utf-8") as file:
            print(render_template("nav.html", title=title), file=file)
            print("<main>", file=file)
            print(create_home_page(conn, title), file=file)
            print('\n'.join(generate_active_htmls(conn)), file=file)
            print(create_tag_pages(conn), file=file)
            print(create_tags(conn), file=file)
            print(create_reference_pages(conn), file=file)
            print(create_bibliography(conn), file=file)
            print("</main>", file=file)

        dummy = tempdir/"Slipbox.md"
        dummy.write_text(render_dummy(title), encoding="utf-8")
        cmd = """{pandoc} Slipbox.md -Hheader.txt --metadata title:{title} -Aafter.txt
                --section-divs {opts} -o {output} -c style.css --mathjax
            """.format(
            pandoc=pandoc(),
            title=shlex.quote(title),
            opts=options,
            output=out/"index.html")
        subprocess.run(shlex.split(cmd), check=False, cwd=tempdir)
