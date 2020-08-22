import { strict as assert } from 'assert'

import { interact, toJSONFilter, walkAll } from '../../../pandoc-tree/src/index.js'
import * as types from '../../../pandoc-tree/src/types.js'
import { makeTopLevelSections, stringify } from '../../../pandoc-tree/src/utils.js'

import { parseHeaderText, parseLink, hashtagPrefix } from './utils.js'
import { Slipbox } from './slipbox.js'

function init (slipbox) {
  const notes = []

  function Header (elem) {
    if (elem.level !== 1) return
    const content = stringify(elem.json)
    assert(content != null)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      elem.identifier = String(id)
      elem.attributes.title = title
      elem.attributes.level = String(elem.level)
      notes.push([elem.identifier, title, '<temp>'])
      return elem
    }
  }

  function Pandoc (doc) {
    function f (header) {
      const classes = ['level1']
      const attrs = { level: String(header.level) }
      return new types.Attr(header.identifier, classes, attrs)
    }
    doc.blocks = makeTopLevelSections(doc.blocks, f)
    slipbox.saveNotes(notes)
    return doc
  }

  return { Header, Pandoc }
}

function collect (slipbox) {
  const cites = {}
  const links = []
  const tags = []

  function Div (div) {
    if (!div.classes.includes('level1')) return
    if (!Number.isInteger(Number(div.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    function Cite (elem) {
      for (const citation of Object.values(elem.citations)) {
        const rec = cites[div.identifier] || new Set()
        rec.add(citation.id)
        cites[div.identifier] = rec
      }
    }

    function Link (elem) {
      const link = parseLink(div.identifier, elem)
      if (link) {
        links.push(link)
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
    return div
  }

  function Pandoc (doc) {
    slipbox.saveCitations(cites)
    slipbox.saveLinks(links)
    slipbox.saveTags(tags)
  }

  return { Div, Pandoc }
}

function modify (slipbox) {
  const withEmptyLinkTargets = new Set()

  function Div (div) {
    if (!div.classes.includes('level1')) return
    if (!Number.isInteger(Number(div.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    let hasEmptyLinkTarget = false

    function Link (elem) {
      if (!elem.target) {
        hasEmptyLinkTarget = true
        return elem.content
      }

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

    const filter = { Link, Str }
    const children = div.content.map(block => block.json)
    walkAll(children, toJSONFilter(filter))

    if (hasEmptyLinkTarget) {
      withEmptyLinkTargets.add(div.identifier)
    }

    div.content = children.map(types.fromJSON)
    return div
  }

  function Pandoc (doc) {
    // console.error('warning:', withEmptyLinkTargets)
  }

  return { Div, Pandoc }
}

function main () {
  const slipbox = new Slipbox()
  const filters = [
    init(slipbox),
    collect(slipbox),
    modify(slipbox)
  ].map(toJSONFilter)
  interact(...filters)
}

main()
