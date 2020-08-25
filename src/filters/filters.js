#!/usr/bin/env node
import { strict as assert } from 'assert'

import { interact, toJSONFilter, walkAll } from '../../../pandoc-tree/src/index.js'
import * as types from '../../../pandoc-tree/src/types.js'
import { makeTopLevelSections, stringify } from '../../../pandoc-tree/src/utils.js'

import { warning } from './log.js'
import { parseFilename, parseHeaderText, parseLink, hashtagPrefix } from './utils.js'
import { Slipbox } from './slipbox.js'

function preprocess () {
  function Pandoc (doc) {
    let filename
    for (const elem of doc.blocks) {
      if (elem instanceof types.RawBlock) {
        filename = parseFilename(elem) || filename
      } else if (elem instanceof types.Header) {
        assert(filename && typeof filename === 'string')
        elem.attributes.filename = filename
      }
    }
    return doc
  }

  return { Pandoc }
}

function init (slipbox) {
  const notes = {}

  function RawBlock (elem) {
    if (elem.format === 'html' && parseFilename(elem)) {
      return []
    }
  }

  function Header (elem) {
    if (elem.level !== 1) return
    const content = stringify(elem.json)
    assert(content != null)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      const note = { title, filename: elem.attributes.filename }
      assert(note.filename)
      elem.identifier = String(id)
      elem.attributes.title = title
      elem.attributes.filename = undefined

      const existing = notes[elem.identifier]
      if (existing == null) {
        notes[elem.identifier] = note
      } else {
        warning([
          `Duplicate ID: ${elem.identifier}`,
          `Could not insert note '${title}'.`,
          `Note '${existing.title} already uses the ID.'`
        ])
      }
      return elem
    }
  }

  function Pandoc (doc) {
    doc.blocks = makeTopLevelSections(
      doc.blocks,
      header => new types.Attr(header.identifier, ['level1'])
    )
    slipbox.saveNotes(notes)
    return doc
  }

  return { Header, RawBlock, Pandoc }
}

function collect (slipbox) {
  const aliases = {}
  const cites = {}
  const links = []
  const tags = []

  function Div (div) {
    if (!div.classes.includes('level1')) return
    if (!Number.isInteger(Number(div.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    let hasEmptyLink = false

    function Cite (elem) {
      for (const citation of Object.values(elem.citations)) {
        const rec = cites[div.identifier] || new Set()
        rec.add(citation.id)
        cites[div.identifier] = rec
      }
    }

    function Link (elem) {
      if (!elem.target) {
        hasEmptyLink = true
        return elem.content
      }

      const link = parseLink(div.identifier, elem)
      if (!link) return
      if (link.tag === 'direct') {
        links.push(link)
      } else if (link.tag === 'sequence') {
        const alias = aliases[link.description]
        if (alias && alias.id !== div.identifier) {
          warning([
            `Duplicate alias definition for '${link.description}' used by note ${alias.id}.`,
            `It will not be used as an alias for note ${div.identifier}.`
          ])
          return
        }
        aliases[link.description] = {
          id: link.dest,
          owner: link.src
        }
      }
    }

    function Str (elem) {
      if (hashtagPrefix(elem.text)) {
        tags.push([div.identifier, elem.text])
      }
    }

    const filter = { Cite, Link, Str }
    const children = div.content.map(block => block.json)
    walkAll(children, toJSONFilter(filter))
    div.content = children.map(types.fromJSON)
    if (hasEmptyLink) {
      warning([`Note ${div.identifier} contains a link with an empty target.`])
    }
    return div
  }

  function Pandoc (doc) {
    slipbox.saveAliases(aliases)
    slipbox.saveCitations(cites)
    slipbox.saveLinks(links)
    slipbox.saveTags(tags)
  }

  return { Div, Pandoc }
}

function modify (slipbox) {
  function Div (div) {
    if (!div.classes.includes('level1')) return
    if (!Number.isInteger(Number(div.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    function Link (elem) {
      const content = stringify(elem.json)
      if (!content) {
        return [
          new types.Str(' ['),
          new types.Link(
            [new types.Str(elem.target)],
            elem.target,
            elem.title
          ),
          new types.Str(']')
        ]
      }
    }

    function Str (elem) {
      if (hashtagPrefix(elem.text)) {
        return new types.Link([elem], '#' + elem.text)
      }
    }

    const footnotes = []
    function Note (elem) {
      footnotes.push(new types.Div(elem.content))
      return new types.Superscript([new types.Str(String(footnotes.length))])
    }

    const filter = { Link, Note, Str }
    const children = div.content.map(block => block.json)
    walkAll(children, toJSONFilter(filter))
    div.content = children.map(types.fromJSON)

    // insert footnotes into document
    if (footnotes.length > 0) {
      const ol = new types.OrderedList(footnotes.map(fn => [fn]))
      div.content.push(new types.HorizontalRule())
      div.content.push(ol)
    }

    // hide sections
    if (div.classes.includes('level1')) {
      div.attributes.style = 'display:none'
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
  ].map(toJSONFilter)
  interact(...filters)
}

main()
