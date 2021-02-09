# 0 slipbox

`slipbox` is a static site generator for Zettelkasten notes.

- [Getting started](#1)
- [Note format](#2)
- [Linking notes](#3)
- [Graph](#8)
- [Text search](#10)

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs/index.md>



# 1 Getting started

Make sure you have `pandoc` and `python` installed.

```bash
# Install slipbox.
pip install slipbox

# (Optional) Install genanki to generate Anki flashcards from your notes.
pip install genanki

# Create slipbox directory.
slipbox init my-slipbox

# Generate site.
cd my-slipbox
slipbox build
```

The initialized directory contains a `.slipbox` directory.
Inside it you'll find a [configuration file](#7), an sqlite3 database
and a patterns file.

---

#writing-notes

- [Note format](#2)
- [Citations](#6)



# 2 Note format

Slipbox notes begin with a level 1 header.
The header text must contain an ID (number) and a title.

You can put any number of notes in one file.

---

#writing-notes

- [Linking notes](#3)
- [Generate note IDs](#11)



# 3 Linking notes

Link to a note in your slipbox using the note's ID as the link target.

[Example](#4).

---

#writing-notes

- [Linking to external files/images](#4)

#connecting-notes

- [Tags](#5)
- [Contextual tags](#9)
- [Graph](#8)



# 4 Linking to external files/images

Links to external files/images must be relative to the output HTML.

![Example](images/example.png)



# 5 Tags

#slipbox uses hashtags to tag notes.
You can click on tags to get a list of other notes that have the same
tag.



# 6 Citations
#slipbox

Clicking on a citation will open a page with all notes that cite the
same reference.

[Example: @cite2020].

To enable citations, you need to specify a bibliography file in the
[config file](#7).



# 7 Configuration

Here's a sample config file with `citeproc`.

```
# .slipbox/config.cfg

[slipbox]
content_options = --mathjax --bibliography my-bib.bib --citeproc
document_options = --mathjax --o output.html -s
```

`content_options`
: Used when Pandoc converts new notes into HTML sections.

`document_options`
: Used when Pandoc compiles every section into one file.



# 8 Graph

`slipbox` uses [Cytoscape.js](https://js.cytoscape.org/) for visualizing
notes.
The notes are put in a hierarchical layout.
When the graph gets too big, it switches to the
[cose layout](https://js.cytoscape.org/#layouts/cose).

Entrypoints are shown in blue.

The slipbox Cytoscape object can be accessed from the browser console
as `window.slipbox.cy`.

---

#connecting-notes

- [Contextual tags](#9)



# 9 Contextual tags

[Tag pages](#5) show a cluster of notes at the bottom of the page.
The cluster contains notes as well as [links](#3) that belong to the tag.

Links are added to clusters using contextual tags.
When you link to a note, the link automatically gets tagged with the
last tag that appears in the note before the link.



# 10 Text search

Slipbox provides text search using `lunr.js`.
See the [`lunr.js` docs](https://lunrjs.com/guides/searching.html) to
learn more about the syntax for complex queries.



# 11 Generate note IDs

`slipbox new` prints the smallest available ID.
