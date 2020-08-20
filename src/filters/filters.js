import { strict as assert } from 'assert'

import { interact, toJSONFilter } from '../../../pandoc-tree/src/index.js'
import { stringify } from '../../../pandoc-tree/src/utils.js'
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

interact(toJSONFilter(filter))
