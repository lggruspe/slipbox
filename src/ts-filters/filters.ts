#!/usr/bin/env node
import { strict as assert } from 'assert'

import {
  create,
  filter as f,
  get,
  set,
  types as t,
  utils,
  wrap
} from 'pandoc-tree'

import { warning } from './log.js'
import {
  parentAlias,
  parseFilename,
  parseHeaderText,
  parseLink,
  isReferenceId,
  hashtagPrefix
} from './utils.js'
import { Slipbox } from './slipbox.js'

const { makeTopLevelSections, stringify } = utils
const { interact, walkBlocks } = f

function preprocess (): f.FilterSet {
  function Pandoc (doc: t.Pandoc) {
    let filename = ''
    for (const elem of doc.blocks) {
      if (elem.t === 'RawBlock') {
        if (get.format(elem) === 'html') {
          filename = parseFilename(elem) || filename
        }
      } else if (elem.t === 'Header') {
        if (get.level(elem) === 1) {
          assert(filename)
          get.attributes(elem).push(['filename', filename])
        }
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
    if (get.format(elem) === 'html' && parseFilename(elem)) {
      return []
    }
  }

  function Header (elem: t.Header) {
    if (get.level(elem) !== 1) return
    const content = stringify(elem)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      set.identifier(elem, String(id))
      const attr = new wrap.Attr(get.attr(elem))
      const note = { title, filename: attr.attributes.filename }
      assert(note.filename)
      attr.attributes.title = title
      delete attr.attributes.filename
      attr.save()

      const identifier = get.identifier(elem)
      const existing = notes[identifier]
      if (existing == null) {
        notes[identifier] = note
      } else {
        warning([
          `Duplicate ID: ${identifier}.`,
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
      header => create.Attr(get.identifier(header), ['level1'])
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
    if (!get.classes(div).includes('level1')) return
    if (!Number.isInteger(Number(get.identifier(div)))) return
    // NOTE doesn't exclude numbers in scientific notation

    let hasEmptyLink = false

    function Cite (elem: t.Cite) {
      for (const citation of Object.values(get.citations(elem))) {
        const divID = get.identifier(div)
        const rec = new Set(cites[divID] || [])
        rec.add('ref-' + get.id(citation))
        cites[divID] = rec
      }
    }

    function Link (elem: t.Link) {
      if (!get.target(elem)) {
        hasEmptyLink = true
        return get.content(elem)
      }

      const identifier = get.identifier(div)
      const link = parseLink(identifier, elem)
      if (!link) return
      if (link.tag === 'direct') {
        links.push(link)
      } else if (link.tag === 'sequence') {
        const alias = aliases[link.description]
        if (alias && alias.id !== identifier) {
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
      const text = get.text(elem)
      if (hashtagPrefix(text)) {
        tags.push([get.identifier(div), text])
      }
    }

    const filter = { Cite, Link, Str }
    set.content(div, walkBlocks(get.content(div), filter))
    if (hasEmptyLink) {
      warning([`Note ${get.identifier(div)} contains a link with an empty target.`])
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
    if (!get.classes(div).includes('level1')) return
    if (!Number.isInteger(Number(get.identifier(div)))) return
    // TODO should exclude numbers in scientific notation

    function Link (elem: t.Link) {
      const content = stringify(elem)
      if (!content) {
        const target = get.target(elem)
        return [
          create.Str(' ['),
          create.Link(
            [create.Str(target)],
            target,
            get.title(elem)
          ),
          create.Str(']')
        ]
      }
    }

    function Str (elem: t.Str) {
      const text = get.text(elem)
      if (hashtagPrefix(text)) {
        const src = '#' + text
        return create.Link([elem], src)
      }
    }

    const footnotes: Array<t.Block> = []
    function Note (elem: t.Note) {
      footnotes.push(create.Div(get.content(elem)))
      return create.Superscript([create.Str(String(footnotes.length))])
    }

    const filter = { Link, Note, Str }
    set.content(div, walkBlocks(get.content(div), filter))
    if (footnotes.length > 0) {
      // insert footnotes into document
      get.content(div).push(create.HorizontalRule())
      get.content(div).push(create.OrderedList(footnotes.map(fn => [fn])))
    }
    if (get.classes(div).includes('level1')) {
      // hide sections
      get.attributes(div).push(['style', 'display:none'])
    }
    return div
  }
  return { Div }
}

function citations (slipbox: Slipbox): f.FilterSet {
  const references: Array<[string, string]> = []
  function Div (div: t.Div) {
    if (get.identifier(div) === 'refs') {
      walkBlocks(get.content(div), {
        Div: (elem: t.Div) => {
          const id = get.identifier(elem)
          if (isReferenceId(id)) {
            references.push([id, stringify(elem)])
          }
        }
      })
      return []
    }
  }
  function Pandoc (doc: t.Pandoc) {
    slipbox.saveReferences(references)
    return doc
  }
  return { Div, Pandoc }
}

function main () {
  const slipbox = new Slipbox()
  const filters = [
    preprocess(),
    init(slipbox),
    collect(slipbox),
    modify(slipbox),
    citations(slipbox)
  ]
  interact(filters)
}

main()
