slipbox
=======

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/lggruspe/slipbox/python-app.yml?branch=master)](https://github.com/lggruspe/slipbox)
[![PyPI](https://img.shields.io/pypi/v/slipbox)](https://pypi.org/project/slipbox/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/slipbox)](https://pypi.org/project/slipbox/)
[![GitHub](https://img.shields.io/github/license/lggruspe/slipbox)](https://github.com/lggruspe/slipbox)

`slipbox` is a static site generator for Zettelkasten notes.

Features
--------

- Interactive graph of notes and links
- Static text search
- Supports notes in markdown, RST, LaTeX, dokuwiki, Org-mode, txt2tags, Textile and MediaWiki formats
- Checkers/linters for detecting unlinked notes, missing citations, bad formatting and more

Requirements
------------

- `pandoc` (2.17+)
- `graphviz`
- `python3` (3.8+)

Installation and usage
----------------------

```bash
pip install slipbox

cd my-notes
slipbox init
# ...add notes
slipbox build
```

See [docs-src/index.md](https://github.com/lggruspe/slipbox/blob/master/docs-src/index.md)
and <https://lggruspe.github.io/slipbox>.

Contributing
------------

See [CONTRIBUTING.md](./CONTRIBUTING.md).

License
-------

[MIT](./LICENSE).
