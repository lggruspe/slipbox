slipbox
=======

`slipbox` is a collection of tools for managing notes.

Features
--------

- Citations via `pandoc-citeproc`
- Stores notes data in an sqlite database
- Single-page HTML output with backlinks and folgezettel links
- Generates dot graphs of note connections
- Incremental compilation

Requirements
------------

- `pandoc`
- `python3`
- `grep`
- `graphviz`

Installation
------------

```bash
pip install slipbox
```

Usage
-----

```bash
python -m slipbox notes.db notes -d ' -o notes.html'
```

This command create an HTML out of your markdown notes in the `notes` directory.

- `notes.db` is the filename of the sqlite database.
- `notes` is your notes directory, must be visible from the working directory.
- ` -o notes.html` can be replaced with any pandoc option.
    + Take note of the quotes and the leading space.

See [docs/](https://lggruspe.github.io/slipbox) and `examples/`.

License
-------

MIT.
