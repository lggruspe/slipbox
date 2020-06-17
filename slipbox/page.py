"""Generate complete HTML containing all slipbox notes."""

import os
import shlex
import subprocess

from .utils import make_temporary_file, write_text

def dummy_markdown():
    """Dummy markdown to use as pandoc input."""
    return r"""---
nocite: |
    @*
---
$\,$
```c
```
# References
"""

def generate_active_htmls(conn):
    """Get HTML stored in the database for active sections."""
    sql = """
        SELECT body FROM Html WHERE id IN (SELECT html FROM Sections)
            ORDER BY id DESC
    """
    cur = conn.cursor()
    return map(lambda row: row[0], cur.execute(sql))

def generate_note_data(conn):
    """Generate slipbox note data in javascript."""
    for nid, title in conn.execute("SELECT id, title FROM Notes"):
        yield ("slipbox.notes[{}] = {{title: {}, aliases: [], backlinks: []}}"
               .format(nid, repr(title)))
    for nid, alias in conn.execute("SELECT id, alias FROM ValidAliases"):
        yield "slipbox.notes[{}].aliases.push({})".format(nid, repr(alias))
        yield "slipbox.aliases[{}] = {{id: {}, children: []}}".format(
            repr(alias), nid)

def generate_link_data(conn):
    """Generate slipbox link data in javascript."""
    for row in conn.execute("SELECT src, dest, annotation FROM StrongLinks"):
        yield ("slipbox.notes[{}].backlinks.push({{src: {}, annotation: {}}})"
               .format(row[1], row[0], repr(row[2])))

def generate_sequence_data(conn):
    """Generate slipbox sequence data in javascript."""
    for prev, next_ in conn.execute("SELECT prev, next FROM Sequences"):
        yield f"slipbox.aliases[{next_!r}].parent = {prev!r}"
        yield f"slipbox.aliases[{prev!r}].children.push({next_!r})"

def generate_tag_data(conn):
    """Generate slipbox tag data in javascript."""
    for row in conn.execute("SELECT DISTINCT tag FROM Tags"):
        yield "slipbox.tags[{}] = []".format(repr(row[0]))
    for nid, tag in conn.execute("SELECT id, tag FROM Tags"):
        yield "slipbox.tags[{}].push({})".format(repr(tag), nid)

def generate_data(conn):
    """Generate slipbox data in javascript."""
    yield from """
    let slipbox = {
        aliases: {},
        notes: {},
        tags: {},
    }
    """.split('\n')
    yield from generate_note_data(conn)
    yield from generate_link_data(conn)
    yield from generate_sequence_data(conn)
    yield from generate_tag_data(conn)

def generate_javascript(conn):
    """Generate slipbox javascript code."""
    yield '<script type="text/javascript">'
    yield from generate_data(conn)
    basedir = os.path.dirname(__file__)
    with open(os.path.join(basedir, "data/tags.js")) as file:
        yield from file
    with open(os.path.join(basedir, "data/seealso.js")) as file:
        yield from file
    with open(os.path.join(basedir, "data/toggle.js")) as file:
        yield from file
    yield "</script>"

def generate_complete_html(conn, options):
    """Create final HTML file with javascript."""
    with make_temporary_file(suffix=".md", text=True) as dummy,\
            make_temporary_file() as script,\
            make_temporary_file(suffix=".html", text=True) as html:
        write_text(dummy, [dummy_markdown()])
        write_text(script, generate_javascript(conn))
        write_text(html, generate_active_htmls(conn))
        cmd = "pandoc {dummy} -H {script} -B {html} --section-divs {options}".format(
            dummy=shlex.quote(dummy), script=shlex.quote(script),
            html=shlex.quote(html), options=options)
        subprocess.run(shlex.split(cmd))
