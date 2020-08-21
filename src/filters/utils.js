import { strict as assert } from 'assert'

import { Link } from '../../../pandoc-tree/src/types.js'

const HASHTAG_PATTERN = /^#+[-_a-zA-Z0-9]+/
const HASHTAG_REGEX = new RegExp(HASHTAG_PATTERN)
function hashtagPrefix (text) {
  const result = HASHTAG_REGEX.exec(text)
  if (result == null) return null
  return result[0]
}

const HEADER_PATTERN = /^\s*(\d+)\s+(.+?)\s*$/
const HEADER_REGEX = new RegExp(HEADER_PATTERN)
function parseHeaderText (text) {
  const result = HEADER_REGEX.exec(text)
  if (result != null && result.length === 3) {
    HEADER_REGEX.lastIndex = 0
    return { id: Number(result[1]), title: result[2] }
  }
  // HEADER_REGEX.lastIndex = 0
  return { id: null, title: null }
}

const TARGET_PATTERN = /^#\d+$/
const TARGET_REGEX = new RegExp(TARGET_PATTERN)
const SEQUENCE_PATTERN = /^[a-zA-Z][a-zA-Z0-9]*$/
const SEQUENCE_REGEX = new RegExp(SEQUENCE_PATTERN)
const NUMBER_PATTERN = /^\d+$/
const NUMBER_REGEX = new RegExp(NUMBER_PATTERN)
function parseLink (src, elem) {
  assert(typeof src === 'string')
  assert(elem instanceof Link)

  if (!NUMBER_REGEX.exec(src)) return
  if (!TARGET_REGEX.exec(elem.target)) return
  const tag = SEQUENCE_REGEX.exec(elem.title) ? 'sequence' : 'direct'
  const description = tag === 'direct' ? elem.title : src + elem.title.slice(1)
  const dest = elem.target.slice(1)
  if (NUMBER_REGEX.exec(dest)) {
    return { tag, src, dest, description }
  }
}

export {
  hashtagPrefix,
  parseHeaderText,
  parseLink
}
