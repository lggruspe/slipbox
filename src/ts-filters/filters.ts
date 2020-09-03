#!/usr/bin/env node
import { strict as assert } from 'assert'

import {
  create,
  filter as f,
  types as t,
  utils,
  wrap
} from 'pandoc-tree'

const { makeTopLevelSections, stringify } = utils
const { interact, walkBlocks } = f

import { warning } from './log.js'
import {
  parentAlias,
  parseFilename,
  parseHeaderText,
  parseLink,
  hashtagPrefix
} from './utils.js'
import { Slipbox } from './slipbox.js'

function preprocess (): f.FilterSet {
  function Pandoc (doc: t.Pandoc) {
    let filename
    for (const elem of doc.blocks) {
      if (elem.t === 'RawBlock') {
        filename = parseFilename(elem) || filename
      } else if (elem.t === 'Header') {
        assert(filename && typeof filename === 'string')
        const attr = new wrap.Attr(new wrap.Header(elem).attr)
        attr.attributes.filename = filename
        attr.save()
      }
    }
    return doc
  }

  return { Pandoc }
}

function init (slipbox: Slipbox): f.FilterSet {
  const notes: {
    [id: string]: { title: string, filename: string }
  } = {}

  function RawBlock (elem: t.RawBlock) {
    const format = new wrap.RawBlock(elem).format
    if (format === 'html' && parseFilename(elem)) {
      return []
    }
  }

  function Header (elem: t.Header) {
    const header = new wrap.Header(elem)
    if (header.level !== 1) return
    const content = stringify(elem)
    assert(content != null)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      const attr = new wrap.Attr(header.attr)
      const note = { title, filename: attr.attributes.filename }
      assert(note.filename)
      header.identifier = String(id)
      attr.attributes.title = title
      attr.attributes.filename = undefined
      attr.save()

      const existing = notes[header.identifier]
      if (existing == null) {
        notes[header.identifier] = note
      } else {
        warning([
          `Duplicate ID: ${header.identifier}`,
          `Could not insert note '${title}'.`,
          `Note '${existing.title}' already uses the ID.`
        ])
      }
      return elem
    }
  }

  function Pandoc (doc: t.Pandoc) {
    doc.blocks = makeTopLevelSections(
      doc.blocks,
      header => create.Attr(new wrap.Header(header).identifier, ['level1'])
    )
    slipbox.saveNotes(notes)
    return doc
  }

  return { Header, RawBlock, Pandoc }
}

function collect (slipbox: Slipbox): f.FilterSet {
  const aliases: { [alias: string]: { id: string, owner: string } } = {}
  const cites: { [id: string]: Set<string> } = {}
  const links: Array<{ tag: string, src: string, dest: string, description:string }> = []
  const tags: Array<[string, string]> = []

  function Div (div: t.Div) {
    const wrappedDiv = new wrap.Div(div)
    if (!wrappedDiv.classes.includes('level1')) return
    if (!Number.isInteger(Number(wrappedDiv.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    let hasEmptyLink = false

    function Cite (elem: t.Cite) {
      const wrappedCite = new wrap.Cite(elem)
      for (const citation of Object.values(wrappedCite.citations)) {
        const rec = new Set(cites[wrappedDiv.identifier] || [])
        rec.add(new wrap.Citation(citation).id)
        cites[wrappedDiv.identifier] = rec
      }
    }

    function Link (elem: t.Link) {
      const wrappedLink = new wrap.Link(elem)
      if (!wrappedLink.src) {
        hasEmptyLink = true
        return wrappedLink.content
      }

      const link = parseLink(wrappedDiv.identifier, elem)
      if (!link) return
      if (link.tag === 'direct') {
        links.push(link)
      } else if (link.tag === 'sequence') {
        const alias = aliases[link.description]
        if (alias && alias.id !== wrappedDiv.identifier) {
          warning([
            `Duplicate alias definition for '${link.description}' used by note ${alias.id}.`,
            `It will not be used as an alias for note ${link.dest}.`
          ])
          return
        }
        aliases[link.description] = {
          id: link.dest,
          owner: link.src
        }
      }
    }

    function Str (elem: t.Str) {
      const text = new wrap.Str(elem).text
      if (hashtagPrefix(text)) {
        tags.push([wrappedDiv.identifier, text])
      }
    }

    const filter = { Cite, Link, Str }
    wrappedDiv.content = walkBlocks(wrappedDiv.content, filter)

    if (hasEmptyLink) {
      warning([`Note ${wrappedDiv.identifier} contains a link with an empty target.`])
    }
    return div
  }

  function Pandoc (doc: t.Pandoc) {
    const sequences: Array<[string, string]> = []
    for (const alias of Object.keys(aliases)) {
      const parent = parentAlias(alias)
      if (parent != null) {
        sequences.push([parent, alias])
      }
    }

    slipbox.saveAliases(aliases)
    slipbox.saveSequences(sequences)
    slipbox.saveCitations(cites)
    slipbox.saveLinks(links)
    slipbox.saveTags(tags)
    return doc
  }

  return { Div, Pandoc }
}

function modify (slipbox: Slipbox): f.FilterSet {
  function Div (div: t.Div) {
    const wrappedDiv = new wrap.Div(div)
    if (!wrappedDiv.classes.includes('level1')) return
    if (!Number.isInteger(Number(wrappedDiv.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    function Link (elem: t.Link) {
      const content = stringify(elem)
      if (!content) {
        const wrappedLink = new wrap.Link(elem)
        const target = wrappedLink.src
        const title = wrappedLink.title
        return [
          create.Str(' ['),
          create.Link(
            [create.Str(target)],
            target,
            title
          ),
          create.Str(']')
        ]
      }
    }

    function Str (elem: t.Str) {
      const text = new wrap.Str(elem).text
      if (hashtagPrefix(text)) {
        const src = '#' + text
        return create.Link([elem], src)
      }
    }

    const footnotes: Array<t.Block> = []
    function Note (elem: t.Note) {
      const content = new wrap.Note(elem).content
      footnotes.push(create.Div(content))
      return create.Superscript([create.Str(String(footnotes.length))])
    }

    const filter = { Link, Note, Str }
    wrappedDiv.content = walkBlocks(wrappedDiv.content, filter)

    // insert footnotes into document
    if (footnotes.length > 0) {
      wrappedDiv.content.push(create.HorizontalRule())
      wrappedDiv.content.push(create.OrderedList(footnotes.map(fn => [fn])))
    }

    // hide sections
    if (wrappedDiv.classes.includes('level1')) {
      const attr = new wrap.Attr(wrappedDiv.attr)
      attr.attributes.style = 'display:none'
      attr.save()
    }
    return div
  }

  return { Div }
}

function main () {
  const slipbox = new Slipbox()
  const filters = [
    preprocess(),
    init(slipbox),
    collect(slipbox),
    modify(slipbox)
  ]
  interact(filters)
}

main()
