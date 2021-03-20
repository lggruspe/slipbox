"""Process notes and store results in database.

Preprocessors insert metadata blocks into notes as code blocks.
They are mainly used to pass note metadata to Pandoc filters even when
the input is the concatenation of several files.
"""

from configparser import ConfigParser
from pathlib import Path
from sqlite3 import Connection
import sys
from typing import Any, Callable, Sequence

from . import utils
from .batch import Batch
from .data import process_csvs
from .scan import build_command
from .secparse import parse_sections, SectionParser


Preprocessor = Callable[..., str]


def dokuwiki_metadata(**fields: Any) -> str:
    """Render DokuWiki metadata code block."""
    template = """
<code>
[slipbox-metadata]
{}
</code>
"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def latex_metadata(**fields: Any) -> str:
    """Render LaTeX metadata code block."""
    template = r"""
\begin{verbatim}
[slipbox-metadata]
{}
\end{verbatim}
"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def markdown_metadata(**fields: Any) -> str:
    """Render markdown metadata code block."""
    template = """
```
[slipbox-metadata]
{}
```
"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def mediawiki_metadata(**fields: Any) -> str:
    """Render mediawiki metadata code block."""
    template = """
<pre>[slipbox-metadata]
{}</pre>
"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def org_metadata(**fields: Any) -> str:
    """Render org mode metadata code block."""
    template = """
#+begin_example
[slipbox-metadata]
{}
#+end_example
"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def rst_metadata(**fields: Any) -> str:
    """Render rst metadata code block."""
    template = """
.. code::
[slipbox-metadata]
{}

"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def t2t_metadata(**fields: Any) -> str:
    """Render text2tag metadata code block."""
    return markdown_metadata(**fields)


def textile_metadata(**fields: Any) -> str:
    """Render textile metadata code block."""
    template = """
bc. [slipbox-metadata]
{}

"""
    body = '\n'.join(
        f"{k}={v}"
        for k, v in fields.items()
    )
    return template.format(body)


def preprocess_markdown(*sources: Path, basedir: Path) -> str:
    """Preprocess markdown notes."""
    return "".join(
        markdown_metadata(filename=str(source.relative_to(basedir)))
        + source.read_text(encoding="utf-8")
        for source in sources
    )


def store_html(conn: Connection,
               html: str,
               sources: Sequence[Path]) -> None:
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


PREPROCESSORS = {
    ".md": preprocess_markdown,
    ".markdown": preprocess_markdown,
}


def choose_preprocessor(extension: str) -> Preprocessor:
    """Get preprocessor for extension."""
    return PREPROCESSORS.get(extension, preprocess_markdown)


def create_preprocessed_input(
    tempdir: Path,
    batch: Batch,
    basedir: Path
) -> Path:
    """Create preprocessed input to be passed to Pandoc."""
    preprocess = choose_preprocessor(batch.extension)
    path = tempdir/("input" + batch.extension)
    path.write_text(
        preprocess(*batch.paths, basedir=basedir),
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
