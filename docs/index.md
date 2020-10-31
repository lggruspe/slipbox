0 slipbox
=========

`slipbox` is a static site generator for Zettelkasten notes.

- [Installation](#1)
- [Usage](#2)
- [Note format](#5)
- [Connecting notes](#8)
- [CLI subcommands](#15)

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs/index.md>

---

- Start here #slipbox/1

1 Installation
==============

Make sure you have `pandoc` and `python` installed.

```bash
pip install slipbox
```

---

- Usage #getting-started/2

2 Usage
=======

```bash
python -m slipbox init my-slipbox
cd my-slipbox
# ...add notes
python -m slipbox build
```

---

- Initialize slipbox #usage/3
- Note format #usage/5

3 Initializing slipbox with `slipbox init`
==========================================

```bash
python -m slipbox init my-slipbox
cd my-slipbox
```

The initialized directory contains a `.slipbox` directory.
Inside it you'll find a configuration file, an sqlite3 database and a
patterns file.

---

- Compile notes #usage/4
- Configuring slipbox #initialization/7

4 Compiling notes with `slipbox build`
======================================

`slipbox build` searches the slipbox directory for notes recursively.
It considers every file in the directory that matches the glob patterns
in `.slipbox/patterns`.

You can store each note in a separate file,
or you can put multiple notes together in one file
(a slipbox note is just a [section in a document](#5)).

5 Note format
=============

Slipbox notes begin with a level 1 header.
The header text must contain an ID and a title.

You can navigate to a specific note in the browser by replacing the URL
hash with the ID of the note.

---

- Compiling notes #usage/4
- Images and external links #usage/6

6 Linking to external files/images
==================================

Links must either be absolute or relative to the output HTML.
Suppose your slipbox directory has the following structure.

```bash
.slipbox/
notes/input.md
output.html
images/image.png
```

Example:

```markdown
<!--
Link from notes/input.md to images/image.png is relative to output.html
-->

![](images/image.png)
```

7 `.slipbox/config.cfg`
=======================

The config file gets created when you run `slipbox init`.
Here's a sample config file that uses `mathjax` and `citeproc`.

```
// .slipbox/config.cfg
[slipbox]
content_options = --mathjax --bibliography my-bib.bib -F pandoc-citeproc
document_options = --mathjax --o output.html -c my-css.css
convert_to_data_url = False
```

`content_options` and `document_options` are both passed to Pandoc.

`content_options`
: Used when Pandoc converts new notes into HTML sections.

`document_options`
: Used when Pandoc compiles every section into one file.

8 Note connections
==================
#connections

`slipbox` provides multiple ways of connecting notes.

- [Tags](#9)
- [Links/backlinks](#10)
- [Tagged links](#12)
- [Text search](#13)
- [Citations](#14)

9 Tags
======
#connections

slipbox uses a Pandoc filter to convert hashtags into tags.
You can click on tags to get a list of other notes that have the same
tag.

The [`#tags`](#tags) page contains a list of all tags in use.

---

- Tagged links #tagged-links/12

10 Direct links
===============
#connections

To link to a note in the slipbox, use the note's ID as the link target.
slipbox automatically creates backlinks from direct links.

The links can be seen in the interactive graph below. [](#11)

11 Note graph
=============
#connections

Note pages contain a graph of notes related to the current note at the
bottom of the page.

It shows

- the current note (black)
- related notes (gray)
- [links and backlinks](#10) (solid lines)
- [tagged links](#12) (dashed lines).

12 Tagged links
===============
#connections

A tagged link is a hashtag followed by a slash and a note ID.
Example: #example/11.

This connects the current note to the linked note.

The purpose of the tag is to distinguish between different levels of
sequences.

-   In a book, there's a sequence of chapters, a sequence of sections,
    etc.
-   Tagged links make it possible to distinguish between different types
    of sequences.

These links show up in the [interactive graph](#11) as dashed lines.

13 Text search
==============

There's a search bar at the top of the page that you can use to look
for notes.

14 Citations
============

`slipbox` uses `pandoc-citeproc` for citations.
Clicking on a citation will open a page with a list of all notes that
cite the same reference.

Here's how a citation looks: [@cite2020].

To activate this feature, you need to specify a bibliography file in the
[config file](#7).
You also need to have `pandoc-citeproc` installed.

The [`#references`](#references) page contains a list of all cited references.

15 CLI subcommands
==================

- [build](#4)
- [check](#17)
- [flashcards](#16)
- [info](#18)
- [init](#3)

16 Generating flashcards with `slipbox flashcards`
==================================================

```bash
python -m slipbox flashcards out.apkg
```

This command generates Anki flashcards from your slipbox notes and saves
it to `out.apkg`.

### Requirements

This feature requires `genanki`.
Installing `genanki`:

```bash
pip install genanki
```

17 `slipbox check`
==================

```bash
python -m slipbox check
```

This command checks for:

- notes that tag/link to non-existent notes
- isolated notes

If a bibliography is specified in the [config file](#7), it also checks
for notes that lack citations.

18 `slipbox info`
=================

`python -m slipbox info` prints information about a note, given its ID.

Ex:

```bash
python -m slipbox info 18   # prints title and filename of note #18
```
