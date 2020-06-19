# 0 Tutorial: Note 0 is the entry point

`slipbox` assumes that note 0 is the first page.
You can use it as an entry point to your notes.

- You can organize your notes in files in many ways [](#2 '0b').
- Just remember to put the note ID and the title in a level 1 header. [](#1 '0a').
- You can make connections between notes using tags [](#3 '0c').
- But it's better if you make more specific types of connections [](#4 '0a1').
- `slipbox` supports direct links, backlinks [](#5 '0a1a') and sequence links [](#6 '0a1b').
    + To create note sequences, you need to understand note aliases [](#9 '0a1b1')
    + and the syntax [](#10 '0a1b2').
- Backlinks and sequence links appear in the 'See also' section of each note [](#8 '0a2').
- You can add citations by specifying a bibliography file [](#7 '0d').
- You can visualize notes using `slipbox.graph` [](#11 '0e').

![](tutorial.png){ width=100% }

# 1 Every note has an ID and a title

Each note must have a unique ID and a title.
The ID has to be an integer.
To add a new note just create a level 1 header containing an ID followed
by a space and a title.

```markdown
# 1 Every note has an ID and a title

This belongs to note 1.

# 2 This is a different note
```

Everything before the next level 1 header is part of the note.
(Or if you want, you can write [one note per file](#2).)

# 2 A file can contain multiple notes

You can place any number of notes in a file, but notes can't be split
into multiple files.
So the entirety of this note (1) should only appear in this file.

You could also write one note per file.

# 3 You can use hashtags anywhere in the note

#You #can #add #tags #like #this.

Click on the tags to see a list of notes with the same tag.

# 4 Types of links

`slipbox` supports several types of links.

Direct links
:   You can link to other notes by specifying the note ID as the target.
    This works even when the note section is in [another file](#2).

[Backlinks](#5 "An annotated direct link generates a backlink.")
:   An annotated direct link generates a backlink.
    It's sometimes nicer to put the annotation in a reference link.
    But you have to make sure that the label is unique across all your
    note files.
    One way to do this is to use IDs of the source and target notes,
    like this [\[4-5\]][4-5].

Sequence links
:   A [sequence link](#6) is a special type of link that indicates the
    order to read a sequence of notes in.

[4-5]: #5 "This creates another backlink."

# 5 Backlinks are generated from annotated direct links

This note has backlinks generated from note [](#4).
If you hover over the backlink, you'll see the description from the
forward link.

# 6 Notes in a sequence have aliases

While note IDs are meant to uniquely identify notes, aliases are meant
to show which notes belong in a sequence.
For example,
```
0a -> 0a1 -> 0a1b
```

Each of these aliases correspond to a real ID.
These aliases are defined in an outline note using sequence links.

# 7 Specify a bibliography file to use citations

If you specify a bibliography in the options, `slipbox` generates a
bibliography page containing every reference in the bibliography.
You can access this page by replacing the URL hash with
[references](#references).

It also generates a section for each cited reference, which contains a
list of all notes that cite the reference [@cite2020].

You have to specify the bibliography file using the `-c` option.
Take note of the quotes and the spaces in the options.


```bash
python -m slipbox notes.db notes -c ' --bibliography notes.bib' -d ' -o notes.html'
```

# 8 See also section: backlinks and sequence links

The 'See also' section lists [backlinks](#5) and [sequence links](#6).
The sequence links include 'previous notes' and 'next notes' as defined
by some outline note.
You can distinguish between backlinks and sequence links by looking at
the ID that appears next to the title of the linked note.

- Backlinks are shown with [real IDs](#1).
- Sequence links are shown with [aliases](#6).

# 9 How to derive note aliases

A note alias is a string of numbers and letters.
It always starts with a number.

Example: [0a1b](#6).
The first number (0) indicates the owner or the outline note of the
sequence.
Often it is the ID of the note that contains the sequence link for the
alias.

In this example, [0a1](#4) is preceded by [0a](#1) and followed by
[0a1b](#6).
Presumably, there's another note [0a1a](#5) that follows note [0a1](#4).
So to follow a note alias, just append a number \[letter\] if the last
symbol is a letter \[number\].
The sequence links for these note aliases are defined in note [](#0).

# 10 How to write a structure note with sequence links

A sequence link looks just like a direct link,
but there's one difference: it contains an alias description.

A sequence link has three parts.

1. Some (optional) text
2. The real ID of the target note
3. The note alias

```markdown
[Text](#11 '10a1b3')
```

Note [](#0) contains sequence links for these notes.

# 11 Visualize notes using `slipbox.graph`

```bash
python -m slipbox notes.db notes -d ' -o notes.html'
python -m slipbox.graph notes.db -d -s -b -o notes.dot
dot notes.dot -Tpng -o notes.png
```

The output would look something like this.

![](tutorial.png){ width=100% }

Black lines represent direct links and red lines represent sequence
links.
Dashed lines represent backlinks.
