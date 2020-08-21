import { strict as assert } from 'assert'

import { interact, toJSONFilter } from '../../../pandoc-tree/src/index.js'
import { Attr } from '../../../pandoc-tree/src/types.js'
import { makeTopLevelSections, stringify } from '../../../pandoc-tree/src/utils.js'

import { parseHeaderText } from './utils.js'
import { Slipbox } from './slipbox.js'

function init (slipbox) {
  const notes = []

  function Header (elem) {
    if (elem.level !== 1) return
    const content = stringify(elem.json)
    assert(content != null)
    const { id, title } = parseHeaderText(content)
    if (id != null && title != null) {
      notes.push([id, title, '<temp>'])
      elem.identifier = String(id)
      elem.attributes.title = title
      elem.attributes.level = String(elem.level)
      return elem
    }
  }

  function Pandoc (doc) {
    function f (header) {
      const classes = ['level1']
      const attrs = { level1: header.level }
      return new Attr(header.identifier, classes, attrs)
    }
    doc.blocks = makeTopLevelSections(doc.blocks, f)
    console.error(notes)
    slipbox.saveNotes(notes)
    return doc
  }

  return { Header, Pandoc }
}

function main () {
  const slipbox = new Slipbox()
  interact(toJSONFilter(init(slipbox)))
}

main()
