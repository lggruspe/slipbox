slipbox
=======

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/lggruspe/slipbox/Python%20application)
![PyPI](https://img.shields.io/pypi/v/slipbox)
![PyPI - Python Version](https://img.shields.io/pypi/pyversions/slipbox)
![GitHub](https://img.shields.io/github/license/lggruspe/slipbox)

`slipbox` is a static site generator for Zettelkasten notes.

Features
--------

- Interactive graph of notes and links
- Text search
- Spaced repetition
- Anki generator

Requirements
------------

- `pandoc` (should be compiled with `pandoc-types` 1.22)
- `python3` (3.8+)
- `genanki` (only needed when generating Anki cards)

Installation and usage
----------------------

```bash
pip install slipbox
slipbox init my-slipbox
cd my-slipbox
# ...add notes
slipbox build
```

See [docs/index.md](https://github.com/lggruspe/slipbox/blob/master/docs/index.md)
and <https://lggruspe.github.io/slipbox>.

License
-------

[MIT](./LICENSE).
