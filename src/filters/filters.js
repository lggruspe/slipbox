import { strict as assert } from 'assert'

import { interact, toJSONFilter, walkAll } from '../../../pandoc-tree/src/index.js'
import { Attr } from '../../../pandoc-tree/src/types.js'
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
      return new Attr(header.identifier, classes, attrs)
    }
    doc.blocks = makeTopLevelSections(doc.blocks, f)
    slipbox.saveNotes(notes)
    return doc
  }

  return { Header, Pandoc }
}

function collect (slipbox) {
  const cites = []
  const links = []
  const tags = []

  function Div (div) {
    if (!div.classes.includes('level1')) return
    if (!Number.isInteger(Number(div.identifier))) return
    // NOTE doesn't exclude numbers in scientific notation

    function Cite (elem) {
      for (const citation of Object.values(elem.citations)) {
        cites.push([div.identifier, citation.id])
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
    return walkAll(children, toJSONFilter(filter), true)
  }

  function Pandoc (doc) {
    slipbox.saveCitations(cites)
    slipbox.saveLinks(links)
    slipbox.saveTags(tags)
  }

  return { Div, Pandoc }
}

function main () {
  const slipbox = new Slipbox()
  const filters = [init(slipbox), collect(slipbox)].map(toJSONFilter)
  interact(...filters)
}

main()
