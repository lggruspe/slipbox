slipbox
=======

`slipbox` is a static site generator for Zettelkasten notes.

Features
--------

- Citations via `pandoc-citeproc`
- Stores notes data in an sqlite3 database
- Single-page HTML output with backlinks and Folgezettel links
- Incremental compilation
- Fuzzy text search
- Interactive visualization of Folgezettels
- Anki generator

Requirements
------------

- `pandoc` (should be compiled with `pandoc-types` 1.21)
- `pandoc-citeproc`
- `python3`
- `genanki` (only needed for generating Anki cards)

Installation and usage
----------------------

```bash
pip install slipbox
python -m slipbox init my-slipbox
cd my-slipbox
# ...add notes
python -m slipbox build
```

See [docs/index.md](https://github.com/lggruspe/slipbox/blob/master/docs/index.md)
and <https://lggruspe.github.io/slipbox>.

License
-------

MIT.

Credits
-------

This project includes [pandoc.css](https://gist.github.com/killercup/5917178).
