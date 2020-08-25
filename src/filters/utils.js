import { strict as assert } from 'assert'

import { Link, RawBlock } from '../../../pandoc-tree/src/types.js'

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
  return { id: null, title: null }
}

const TARGET_PATTERN = /^#\d+$/
const TARGET_REGEX = new RegExp(TARGET_PATTERN)
const SEQUENCE_PATTERN = /^\/[a-zA-Z][a-zA-Z0-9]*$/
const SEQUENCE_REGEX = new RegExp(SEQUENCE_PATTERN)
const NUMBER_PATTERN = /^\d+$/
const NUMBER_REGEX = new RegExp(NUMBER_PATTERN)
function parseLink (src, elem) {
  assert(typeof src === 'string')
  assert(elem instanceof Link)

  if (!NUMBER_REGEX.exec(src)) return
  if (!TARGET_REGEX.exec(elem.target)) return
  const dest = elem.target.slice(1)
  if (!NUMBER_REGEX.exec(dest)) return

  if (!SEQUENCE_REGEX.exec(elem.title)) {
    return { src, dest, tag: 'direct', description: elem.title }
  }
  return { src, dest, tag: 'sequence', description: src + elem.title.slice(1) }
}
const RAWBLOCK_PATTERN = /^<!--#slipbox-metadata\nfilename: (.+?)\n-->$/
const RAWBLOCK_REGEX = new RegExp(RAWBLOCK_PATTERN)
function parseFilename (elem) {
  assert(elem instanceof RawBlock)
  const result = RAWBLOCK_REGEX.exec(elem.text)
  if (result && result.length > 1) {
    return result[1]
  }
}

const ALIAS_PATTERN_A = /^(\d+[\da-z]*?)[a-z]+$/
const ALIAS_REGEX_A = new RegExp(ALIAS_PATTERN_A)
const ALIAS_PATTERN_D = /^(\d+[\da-z]*?)\d+$/
const ALIAS_REGEX_D = new RegExp(ALIAS_PATTERN_D)
function parentAlias (alias) {
  assert(typeof alias === 'string')
  let result = ALIAS_REGEX_A.exec(alias)
  if (result && result.length > 1) {
    return result[1]
  }
  result = ALIAS_REGEX_D.exec(alias)
  if (result && result.length > 1) {
    return result[1]
  }
  return null
}

export {
  hashtagPrefix,
  parentAlias,
  parseFilename,
  parseHeaderText,
  parseLink
}
