"""Process notes and store results in database.

Preprocessors insert metadata blocks into notes as code blocks.
They are mainly used to pass note metadata to Pandoc filters even when
the input is the concatenation of several files.
"""

from configparser import ConfigParser
from hashlib import sha256
from pathlib import Path
from sqlite3 import Connection
import sys
import typing as t

from . import utils
from .batch import Batch
from .data import process_csvs
from .scan import build_command
from .secparse import parse_sections, SectionParser


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


def render_metadata(template: str, **fields: t.Any) -> str:
    """Render metadata code block using template."""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def preprocess(template: str, *sources: Path, basedir: Path) -> str:
    """Preprocess notes (sources) by inserting code blocks generated
    using the template.
    """
    def preprocess_single(source: Path) -> str:
        """Preprocess a single file."""
        content = source.read_bytes()
        filename = str(source.relative_to(basedir))
        _hash = sha256(content).hexdigest()
        metadata = render_metadata(template, filename=filename, hash=_hash)
        return metadata + content.decode(encoding="utf-8")
    return "".join(preprocess_single(source) for source in sources)


def store_html(conn: Connection,
               html: str,
               sources: t.Sequence[Path]) -> None:
    """Insert HTML sections into Notes table."""
    if not html.strip() or not sources:
        return
    cur = conn.cursor()

    def callback(this: SectionParser) -> None:
        """Callback for parse_sections."""
        cur.execute(
            "UPDATE Notes SET html = ? WHERE id = ?",
            (this.section, this.id_)
        )
    parse_sections(html, callback)


def create_preprocessed_input(
    tempdir: Path,
    batch: Batch,
    basedir: Path
) -> Path:
    """Create preprocessed input to be passed to Pandoc."""
    template = METADATA_TEMPLATES.get(batch.extension, MARKDOWN_TEMPLATE)
    path = tempdir/("input" + batch.extension)
    path.write_text(
        preprocess(template, *batch.paths, basedir=basedir),
        encoding="utf-8"
    )
    return path


def process_batch(conn: Connection,
                  batch: Batch,
                  config: ConfigParser,
                  basedir: Path) -> None:
    """Process batch of input notes."""
    with utils.temporary_directory() as tempdir:
        preprocessed_input = create_preprocessed_input(tempdir, batch, basedir)
        html = tempdir/"temp.html"
        cmd = build_command(preprocessed_input, str(html), basedir,
                            config.get("slipbox", "content_options"))
        retcode = utils.run_command(cmd, cwd=tempdir)
        if retcode:
            print("Scan failed.", file=sys.stderr)
            return
        process_csvs(conn, tempdir)
        store_html(conn, html.read_text(encoding="utf-8"), batch.paths)
        conn.commit()
