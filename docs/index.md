# 0 slipbox

`slipbox` is a static site generator for Zettelkasten notes.

- [Getting started](#1)
- [Note format](#2)
- [Connecting notes](#3)

GitHub: <https://github.com/lggruspe/slipbox>

Slipbox: <https://lggruspe.github.io/slipbox>

Source: <https://github.com/lggruspe/slipbox/blob/master/docs/index.md>

#slipbox



# 1 Getting started

Make sure you have `pandoc` and `python` installed.

```bash
# Install slipbox.
pip install slipbox

# Install genanki to generate Anki flashcards from your notes.
# This step is optional.
pip install genanki

# Create slipbox directory.
python -m slipbox init my-slipbox

# Generate site.
cd my-slipbox
python -m slipbox build
```

The initialized directory contains a `.slipbox` directory.
Inside it you'll find a [configuration file](#7), an sqlite3 database
and a patterns file.

### See also

#slipbox

- [Note format](#2)
- [Citations](#6)



# 2 Note format

Slipbox notes begin with a level 1 header.
The header text must contain an ID (number) and a title.

You can store each note in a separate file,
or you can put multiple notes in one file.

### See also

#slipbox

- [Linking notes](#3)



# 3 Linking notes

To link to a note in the slipbox, use the note's ID as the link target.

[Example](#4).

The links can be seen in the interactive graph below.

### See also

#slipbox

- [Tags](#5)



# 4 Linking to external files/images

Links must either be absolute or relative to the output HTML.

![Example](images/example.png)



# 5 Tags

#slipbox uses hashtags to tag notes.
You can click on tags to get a list of other notes that have the same
tag.

The [`#tags`](#tags) page contains a list of all tags in use.



# 6 Citations

Clicking on a citation will open a page with a list of all notes that
cite the same reference.

[Example: @cite2020].

To use this feature, you need to specify a bibliography file in the
[config file](#7).

The [`#references`](#references) page contains a list of all cited references.



# 7 `.slipbox/config.cfg`

The config file is `.slipbox/config.cfg` inside the slipbox directory.
Here's a sample config file.

```
[slipbox]
content_options = --mathjax --bibliography my-bib.bib --citeproc
document_options = --mathjax --o output.html -c my-css.css
convert_to_data_url = False
```

`content_options`
: Used when Pandoc converts new notes into HTML sections.

`document_options`
: Used when Pandoc compiles every section into one file.
