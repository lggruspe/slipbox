# 0 What is slipbox?

slipbox is a static site generator for Zettelkasten notes.

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs/index.md>

---

**#getting-started**

- How to install slipbox? [](#1)



# 1 How to install slipbox?

Make sure you have pandoc and python installed.
Your installation of Pandoc needs to have been compiled with
pandoc-types 1.22.

```bash
# Install slipbox.
pip install slipbox

# (Optional) Install genanki to generate Anki flashcards from your notes.
pip install genanki
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

slipbox supports many formats: markdown, RST, LaTeX, dokuwiki,
Org-mode, txt2tags, Textile and MediaWiki.

In these formats, a "note" is just a section that begins with a level 1
header contains a unique ID (number) and a non-empty title.

Your notes don't have to be in separate files.
You can put any number of notes in one file.

Run `slipbox new` to get the next available note ID.

---

**#writing-notes**

- How to link to other notes? [](#4)
- How to add citations? [](#7)



# 4 How to link to other notes?

Use the note ID as the link target.
Ex: [link](#100) (`[link](#100)`).

When you omit the link text, it just shows the target ID.
Ex: [](#100) (`[](#100)`).

In addition to direct links, slipbox also supports connecting notes
using [contextual tags](#6).

---

**#writing-notes**

- How to link to images? [](#5)

**#connecting-notes**

- What are contextual tags? [](#6)



# 5 How to link to images?

![Example](images/example.png)



# 6 What are contextual tags?

slipbox uses #hashtags to tag notes.
You can click on the hashtag to see all the notes that have the same
tag.

The tags are called contextual, because they also apply to the links
between the previous tag and the next tag.

Ex: this #tag applies to [this link](#100) and [this link](#101),
but #not to [this](#102).

slipbox tags links contextually in order to cluster notes.



# 7 How to add citations?

[Cite @cite2020].

To enable citations, you need to specify a bibliography file in
`.slipbox/config.cfg`.

Here's a sample config file.

```cfg
[slipbox]
content_options = --bibliography example.bib --citeproc
```

Clicking on a citation will open a page with all notes that cite the
same reference.



# 8 How to view the generated site?

```bash
# Generate the site.
slipbox build

# Go to the output directory (public/ by default, see .slipbox/config.cfg).
python -m http.server
```

---

**#view-notes**

- How to use text search? [](#9)
- How to interpret the notes graph? [](#12)



# 9 How to use text search?

Slipbox provides text search using lunr.js.
See the [lunr.js docs](https://lunrjs.com/guides/searching.html) to
learn more about the syntax for complex queries.



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
: Options that get passed to Pandoc to convert notes to HTML.
: Use this if you want to apply custom filters or to enable citeproc.

`document_options`
: Options that get passed to Pandoc to compile all HTML sections into
: one file.
: Use this if you want to add HTML, JavaScript, CSS, etc. into the output.

`output_directory`
: Contains the generated site.

`title`
: Site title.



# 12 How to interpret the notes graph?

slipbox uses [Cytoscape.js](https://js.cytoscape.org/) to display note
[clusters](#6).

-   Entrypoints are shown in blue.
-   The slipbox Cytoscape object can be accessed from the browser
    console as `window.slipbox.cy` (for analysis).
