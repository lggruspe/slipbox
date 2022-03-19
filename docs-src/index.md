# 0 What is slipbox?

slipbox is a static site generator for Zettelkasten notes.

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs-src/index.md>

---

**#getting-started**

- How to install slipbox? [](#1)



# 1 How to install slipbox?

Make sure you have graphviz, pandoc and python installed.
Your installation of Pandoc needs to be compiled with pandoc-types 1.22.

```bash
# Install slipbox.
pip install slipbox
```

---

**#getting-started**

- How to run slipbox? [](#2)



# 2 How to run slipbox?

```bash
# Create slipbox directory.
# This creates a .slipbox/ directory inside my-slipbox.
slipbox init my-slipbox

# Generate site.
cd my-slipbox
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



# 4 How to link to other notes?

Use the note ID as the link target.
Ex: [link](#100) (`[link](#100)`).

When you omit the link text, it just shows the target ID.
Ex: [](#100) (`[](#100)`).

You can also connect notes by tagging them.

---

**#writing-notes**

- How to link to images? [](#5)
- How to tag notes? [](#6)



# 5 How to link to images?

```markdown
![Example](images/example.png)
```

![Example](images/example.png)



# 6 How to tag notes?

Slipbox uses #hashtags to tag notes.

Note: more accurately, hashtags don't apply to notes but to links that
appear after the tag.

Ex: this #tag applies to [this link](#100) and [this link](#101),
but #not to [this](#102).

Tagged links show up in the graph of tag pages.



# 7 How to add citations?

[Cite @cite2020].

To enable citations, you need to specify a bibliography file in
`.slipbox/config.cfg`.

Here's a sample config file.

```cfg
[slipbox]
content_options = --bibliography example.bib --citeproc
```

Click citation links to see the other notes that cite the same
reference.



# 8 How to view the generated site?

```bash
# Generate the site.
slipbox build

# Go to the output directory (public/ by default, see .slipbox/config.cfg).
python -m http.server

# Go to localhost:8000 in your browser.
```

---

**#view-notes**

- How to use text search? [](#9)



# 9 How to use text search?

Click on the search icon at the top of the page and start typing.
Slipbox uses lunr.js for text search.
See the [lunr.js docs](https://lunrjs.com/guides/searching.html) to
read more about its features.



# 10 What does the `.slipbox/` directory contain?

The `.slipbox` directory contains

- an sqlite3 database (`data.db`)
- a patterns file (`patterns`)
- a configuration file (`config.cfg`).

---

**#dot-slipbox**

- What do the configuration options mean? [](#11)



# 11 What do the configuration options mean?

`content_options`
: Options that get passed to Pandoc to convert notes to HTML fragments.
: Edit this if you want to apply custom filters or to enable citeproc.

`output_directory`
: Contains the generated site.

`title`
: Site title.
