# Contributing

## Requirements

This guide assumes that you already have these programs installed:

- `graphviz`
- `lua`
- `luarocks`
- `make`
- `node`
- `npm`
- `pandoc`
- `python`

Run the following commands to install some additional requirements.

```bash
python -m venv env
. env/bin/activate
make init
```

`make init` is short for `make init-lua init-js init-python`.

`make init-lua`
: Install lua requirements in `filters/lua_modules`.

`make init-js`
: Install JS requirements in `js/node_modules`.

`make init-python`
: Install python requirements in a virtual environment.


## Testing

Before running tests, make sure that you have built the JS and Lua filters.
You only have to do this when you clone the repository for the first time or when you make changes to JS or Lua files.

```bash
# Build JS and Lua filters
make bundle
```

Then you can run all tests and linters:

```bash
make check
```

---

This project uses `tox` and `pytest` for testing.
To test the `slipbox` command-line tool under different versions of Python, run the following command:

```bash
tox
```

---

If you want to test on a specific version of `pandoc`, you can set the `PANDOC` environment variable to the path of your `pandoc` installation.
For example:

```bash
export PANDOC=/path/to/other/version/of/pandoc
tox -epy310
```
