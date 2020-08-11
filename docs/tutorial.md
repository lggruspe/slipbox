0 slipbox
=========

`slipbox` is a static site generator for Zettelkasten notes.

- [Installation](#1 '/a')
- [Basic usage](#2 '/a1')
- [Organizing notes](#3)
- [Connecting notes](#4)
- [Questions](#10 '/b')

GitHub: <https://github.com/lggruspe/slipbox>


1 Installation
==============

Make sure you have `grep`, `pandoc` and `python` installed.

Then

```bash
pip install slipbox
```

Next step: [run slipbox](#2 '/a')


2 Basic usage
=============
#examples

`slipbox` recursively looks for notes in the locations that you specify
when you run `slipbox`.

Here's a minimal example.

```markdown
# 202001011200 Hello

Hello.
```

To run slipbox:

```bash
# Put your notes here.
mkdir notes

# Replace $EDITOR with your text editor and copy the example.
$EDITOR notes/hello.md

# Take note of the quotes and spaces.
python -m slipbox notes slipbox.db -d ' -o example.html'
```

This creates an SQLite file and an HTML file containing [all your notes](#3 '/a').
Don't delete the database file, because `slipbox` will use it to avoid
recompiling all notes from scratch in future invocations.


3 How to organize notes
=======================
#examples

You can put multiple notes in a single file,
because a note is just a section in a markdown file.

Notes in one file are separated by level 1 headings.
The heading must contain a note ID and a title for `slipbox` to find the
note.
The ID can be any number, but it has to be unique.

Example:

```markdown
202003151630 The note ID must be unique
=======================================

Everything between this note's heading and the next belongs to this
note.

202006151725 Next note
======================
```

I recommend shorter IDs instead of longer ones if you want to use
[sequence links](#7).
It's important to [make connections](#4 '/a') between ideas in your notes.


4 How to find related notes
============================

`slipbox` provides multiple ways to connect notes.

- [Tags](#5 '/a')
- [Direct links](#6 '/b')
- Backlinks
- [Sequence links](#7 '/c')
- [Text search](#8 '/d')
- [Citations](#9 '/a1')


5 Tags
======

Notes can be related by tags.
You can click on a #tag to see a list of other notes that share the tag.

Clicking on the header in the #tag page will show a list of all #[tags](#tags).


6 Direct links
==============
#examples #links #visualization

Direct links are an explicit way to [connect](#4) two notes.
To link to a note, you only have to specify the [ID of the note](#3) as
the link target.
In markdown, `[link to note 3](#3)`{ .markdown }.
This works even when the linked note is in another file.

Direct links in the active note appear in the interactive graph as solid
black lines.

### Backlinks

`slipbox` generates backlinks from direct links.
They also appear as solid black lines.

### External links

It's also possible to [link to files](#10 '/b') outside of the slipbox.


7 Sequence links
================
#examples #links #visualization

A sequence link is a special type of [link](#6) that indicates that a set of
notes are to be read in sequence.

### Note aliases

You can determine which sequences a particular note belongs to by simply
looking at its note aliases.
A note alias is a string that alternates between numbers and letters.

For example, suppose 4a2b is a note alias of note 12.
The note alias says that note 12 belongs in a sequence containing notes
4, 4a, 4a2, etc., in that order.

We can think of notes 4a and 4a2b as neighbors of note 4a2.
The interactive graph shows sequence links as dashed lines.

### How to create sequence links

Sequence links are created using regular links,
but the link has to have a note alias in the description.

Example: `[sequence link](#12 '#4a2b')`{ .markdown }`
assigns 4a2b as an alias to note 12.


8 Text search
=============

Even without [tags](#5) or [links](#6), you can look for notes using text search.
You can open the #[search](#search) page by clicking on the search button at the top.


9 Citations
===========
#examples #links

`slipbox` uses `pandoc-citeproc` for citations.
You can click on a citation to see a list of all notes that cite the
same reference.

Clicking on the header of the reference page will open a list of all
cited references.

Here's how a citation looks: [@cite2020].

In order to activate `citeproc`, you have to specify a bibliography file
to `pandoc` using the `-c` option.
Take note of the quotes and spaces in the options.

Example:

```bash
python -m slipbox notes.db notes -c ' --bibliography notes.bib' -d ' -o notes.html'
```


10 Questions
============

### Support for formats other than markdown

`slipbox` should have partial support for most input formats that
`pandoc` supports.
However, [sequence links](#7) require link annotations.

### How to link to external files

Links must be relative to the output HTML.

Suppose you have the following directory structure.

```bash
notes/input.md
output.html
images/image.png
```

To link to the image from `input.md`:

```markdown
<!--input.md-->

![](images/image.png)
```
