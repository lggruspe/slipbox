"""Process notes and store results in database.

Preprocessors insert metadata blocks into notes as code blocks.
They are mainly used to pass note metadata to Pandoc filters even when
the input is the concatenation of several files.
"""

from hashlib import sha256
from pathlib import Path
import shlex
from sqlite3 import Connection
import sys
import typing as t

from lxml.html import HtmlElement  # type: ignore
from pyquery import PyQuery  # type: ignore

from . import utils
from .app import App
from .batch import Batch
from .data import process_csvs


DOKUWIKI_TEMPLATE = """
<code>
[slipbox-metadata]
{}
</code>
"""

# NOTE Some brackets are escaped.
LATEX_TEMPLATE = r"""
\begin{{verbatim}}
[slipbox-metadata]
{}
\end{{verbatim}}
"""

MARKDOWN_TEMPLATE = """
```
[slipbox-metadata]
{}
```
"""

MEDIAWIKI_TEMPLATE = """
<pre>[slipbox-metadata]
{}</pre>
"""

ORG_TEMPLATE = """
#+begin_example
[slipbox-metadata]
{}
#+end_example
"""

RST_TEMPLATE = """
.. code::

    [slipbox-metadata]
    {}

"""

T2T_TEMPLATE = MARKDOWN_TEMPLATE

TEXTILE_TEMPLATE = """
bc. [slipbox-metadata]
{}

"""

METADATA_TEMPLATES = {
    ".dokuwiki": DOKUWIKI_TEMPLATE,
    ".latex": LATEX_TEMPLATE,
    ".markdown": MARKDOWN_TEMPLATE,
    ".md": MARKDOWN_TEMPLATE,
    ".mdown": MARKDOWN_TEMPLATE,
    ".org": ORG_TEMPLATE,
    ".rst": RST_TEMPLATE,
    ".t2t": T2T_TEMPLATE,
    ".tex": LATEX_TEMPLATE,
    ".textile": TEXTILE_TEMPLATE,
    ".wiki": MEDIAWIKI_TEMPLATE,
}


def render_metadata(template: str, prefix: str = "", **fields: t.Any) -> str:
    """Render metadata code block using template."""
    body = ('\n' + prefix).join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def preprocess(template: str,
               *sources: Path,
               basedir: Path,
               prefix: str = "",
               ) -> str:
    """Preprocess notes (sources) by inserting code blocks generated
    using the template.
    """
    def preprocess_single(source: Path) -> str:
        """Preprocess a single file."""
        content = source.read_bytes()
        filename = str(source.relative_to(basedir))
        _hash = sha256(content).hexdigest()
        metadata = render_metadata(template, prefix, filename=filename,
                                   hash=_hash)
        return metadata + content.decode(encoding="utf-8")
    return "".join(preprocess_single(source) for source in sources)


def store_html(conn: Connection,
               html: str,
               sources: t.Sequence[Path]) -> None:
    """Insert HTML sections into Notes table."""
    if not html.strip() or not sources:
        return
    cur = conn.cursor()
    sql = "UPDATE Notes SET html = ? WHERE id = ?"

    def callback(_: int, elem: HtmlElement) -> None:
        id_ = elem.get("id", "")
        if id_.isdigit():
            cur.execute(sql, (PyQuery(elem).outer_html(), int(id_)))

    doc = PyQuery(html)
    sections = doc("section")
    sections.map(callback)


def create_preprocessed_input(
    tempdir: Path,
    batch: Batch,
    basedir: Path
) -> Path:
    """Create preprocessed input to be passed to Pandoc."""
    template = METADATA_TEMPLATES.get(batch.extension, MARKDOWN_TEMPLATE)
    prefix = "    " if batch.extension == ".rst" else ""
    path = tempdir/("input" + batch.extension)
    path.write_text(
        preprocess(template, *batch.paths, basedir=basedir, prefix=prefix),
        encoding="utf-8"
    )
    return path


def build_options(app: App) -> str:
    """Build list of options to pass to pandoc based on user config."""
    options = ""
    config = app.config

    if config.strip_comments:
        options += " --strip-comments "
    if config.bibliography is not None:
        path = shlex.quote(str((app.root/config.bibliography).resolve()))
        options += f" --bibliography {path} --citeproc "
    return options


def build_command(app: App, input_: Path, output: str) -> str:
    """Construct pandoc command to run on input."""
    basedir = app.root
    options = build_options(app)

    assert input_.exists()
    assert basedir

    data = Path(__file__).parent/"data"
    lua_filter = shlex.quote(str((data/"filter.lua").resolve()))
    cmd = f"{app.config.pandoc} {options} -L{lua_filter} --section-divs " \
        f" -Mlink-citations:true --mathjax " \
        "--resource-path {} -o {} --extract-media=''".format(
            shlex.quote(str(basedir.resolve())),
            shlex.quote(output),
        )
    return cmd + ' ' + shlex.quote(str(input_.resolve()))


def process_batch(app: App, batch: Batch) -> bool:
    """Process batch of input notes.

    Returns False on error.
    """
    assert app.root is not None
    with utils.temporary_directory() as tempdir:
        preprocessed = create_preprocessed_input(tempdir, batch, app.root)
        html = tempdir/"temp.html"
        cmd = build_command(app, preprocessed, str(html))
        retcode = utils.run_command(cmd, cwd=tempdir)
        if retcode:
            print("Scan failed.", file=sys.stderr)
            return False

        if app.error_formatter.add_errors(tempdir/"messages.json"):
            return False

        if not process_csvs(app.database, tempdir):
            return False
        store_html(app.database, html.read_text(encoding="utf-8"), batch.paths)
        app.database.commit()
    return True
