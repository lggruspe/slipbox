import { strict as assert } from 'assert'

import { interact, toJSONFilter } from '../../../pandoc-tree/src/index.js'
import { Attr } from '../../../pandoc-tree/src/types.js'
import { makeTopLevelSections, stringify } from '../../../pandoc-tree/src/utils.js'

import { parseHeaderText } from './utils.js'

const filter = {}

filter.Header = function (elem) {
  if (elem.level !== 1) return
  const content = stringify(elem.json)
  assert(content != null)
  const { id, title } = parseHeaderText(content)
  console.error(id, title)
  if (id != null && title != null) {
    // TODO save
    elem.identifier = String(id)
    elem.attributes.title = title
    elem.attributes.level = String(elem.level)
    return elem
  }
}

filter.Pandoc = function (doc) {
  function f (header) {
    const classes = ['level1']
    const attrs = { level1: header.level }
    return new Attr(header.identifier, classes, attrs)
  }
  doc.blocks = makeTopLevelSections(doc.blocks, f)
  return doc
}

interact(toJSONFilter(filter))
