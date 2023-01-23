# 0 What is slipbox?

slipbox is a static site generator for Zettelkasten notes.

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs-src/index.md>

---

**#getting-started**

- How to install slipbox? [](#1)



# 1 How to install slipbox?

First, make sure that you have graphviz, pandoc and python installed.
Your installation of Pandoc needs to be compiled with pandoc-types 1.22.

Then install using `pip`.

```bash
# Install slipbox.
pip install slipbox
```

---

**#getting-started**

- How to use slipbox? [](#2)



# 2 How to use slipbox?

```bash
# Initialize `slipbox` in your notes directory.
cd my-notes
slipbox init

# Generate site.
slipbox build

# Show help.
slipbox -h
```

---

**#writing-notes**

- How to write notes? [](#3)

**#view-notes**

- How to view the generated site? [](#8)

**#dot-slipbox**

- What does the `.slipbox/` directory contain? [](#10)



# 3 How to write notes?

Slipbox supports many formats: markdown, RST, LaTeX, dokuwiki,
Org-mode, txt2tags, Textile and MediaWiki.

A "note" is just a section that begins with a level 1 header.
The header must contain an ID (number) and a title.
You can put any number of notes in one file.

---

**#writing-notes**

- How to link to other notes? [](#4)
- How to add citations? [](#7)
- Note with timestamp ID [](#20200101123000)



# 4 How to link to other notes?

Use the note ID as the link target.
Ex: [link](#100) (`[link](#100)`).

When you omit the link text, it just shows the target ID.
Ex: [](#100) (`[](#100)`).

You can also connect notes indirectly by #tagging them.

---

**#writing-notes**

- How to link to images? [](#5)



# 5 How to link to images?

```markdown
![Example](images/example.png)
```

![Example](images/example.png)



# 7 How to add citations?

[Cite @cite2020].

To enable citations, you need to specify a bibliography file in
`.slipbox/config.cfg`.

```ini
[pandoc-options]
bibliography = example.bib
```

Click citation links to see the other notes that cite the same
reference.

## Styling

You can style the bibliography section by specifying a
[CSL file](https://www.zotero.org/styles) to use in the configuration
file.

```ini
[pandoc-options]
bibliography = examble.bib
csl = example.csl
```

`slipbox` looks for these files relative to the root of your notes directory.


# 8 How to view the generated site?

```bash
# Generate the site.
slipbox build

# Go to the output directory (public/ by default, see .slipbox/config.cfg).
python -m http.server

# Go to localhost:8000 in your browser.
```

Tags: #view-notes



# 10 What does the `.slipbox/` directory contain?

The `.slipbox` directory contains

- an sqlite3 database (`data.db`)
- a configuration file (`config.cfg`).

---

**#dot-slipbox**

- Which settings can you configure in `./slipbox/config.cfg`? [](#11)



# 11 Which settings can you configure in `./slipbox/config.cfg`?

### `[slipbox]` section

`output_directory`
: Contains the generated site

`title`
: Site title

### `[note-patterns]`

Contains glob patterns for finding notes.

Example:

```ini
[note-patterns]
*.md = true
*.markdown = true
*.draft.md = false
```

### `[pandoc-options]`

`bibliography`
: Bibliography file to be used by Pandoc
