import * as fs from 'fs'

import {
  get,
  types as t
} from 'pandoc-tree'

const NUMBER_PATTERN = /^\d+$/
const NUMBER_REGEX = new RegExp(NUMBER_PATTERN)

function isTopLevelSection (div: t.Div): boolean {
  return NUMBER_REGEX.test(get.identifier(div)) && get.classes(div).includes('level1')
}

// TODO shouldn't the pattern be /^.+(\..+)$/
const FILENAME_EXTENSION_PATTERN = /^.+(\..*)$/
const FILENAME_EXTENSION_REGEX = new RegExp(FILENAME_EXTENSION_PATTERN)
function fileExtension (filename: string): string {
  const result = FILENAME_EXTENSION_REGEX.exec(filename)
  return result == null ? '' : result[1].slice(1)
}

const HASHTAG_PATTERN = /^#+[-_a-zA-Z0-9]+/
const HASHTAG_REGEX = new RegExp(HASHTAG_PATTERN)
function hashtagPrefix (text: string): string | null {
  const result = HASHTAG_REGEX.exec(text)
  return result == null ? null : result[0]
}

const HEADER_PATTERN = /^\s*(\d+)\s+(.+?)\s*$/
const HEADER_REGEX = new RegExp(HEADER_PATTERN)
function parseHeaderText (text: string): { id: number | null, title: string | null } {
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
function parseLink (src: string, elem: t.Link): { src: string, dest: string, tag: 'direct' | 'sequence', description: string } | undefined {
  const target = get.target(elem)

  if (!NUMBER_REGEX.exec(src)) return
  if (!TARGET_REGEX.exec(target)) return
  const dest = target.slice(1)

  const title = get.title(elem)
  if (!SEQUENCE_REGEX.exec(title)) {
    return { src, dest, tag: 'direct', description: title }
  }
  return { src, dest, tag: 'sequence', description: src + title.slice(1) }
}

const RAWBLOCK_PATTERN = /^<!--#slipbox-metadata\nfilename: (.+?)\n-->$/
const RAWBLOCK_REGEX = new RegExp(RAWBLOCK_PATTERN)
function parseFilename (elem: t.RawBlock): string | undefined {
  const result = RAWBLOCK_REGEX.exec(get.text(elem))
  if (result && result.length > 1) {
    return result[1]
  }
}

const ALIAS_PATTERN_A = /^(\d+[\da-z]*?)[a-z]+$/
const ALIAS_REGEX_A = new RegExp(ALIAS_PATTERN_A)
const ALIAS_PATTERN_D = /^(\d+[\da-z]*?)\d+$/
const ALIAS_REGEX_D = new RegExp(ALIAS_PATTERN_D)
function parentAlias (alias: string): string | null {
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

const REFERENCE_ID_PATTERN = /^ref-.+$/
const REFERENCE_ID_REGEX = new RegExp(REFERENCE_ID_PATTERN)
function isReferenceId (id: string): boolean {
  return REFERENCE_ID_REGEX.test(id)
}

const CACHE: { [path: string]: string } = {}
function fileToBase64 (path: string): string {
  if (CACHE[path] != null) return CACHE[path]
  const content = fs.readFileSync(path, 'utf-8')
  CACHE[path] = Buffer.from(content, 'utf-8').toString('base64')
  return CACHE[path]
}

export {
  fileExtension,
  fileToBase64,
  hashtagPrefix,
  isReferenceId,
  isTopLevelSection,
  parentAlias,
  parseFilename,
  parseHeaderText,
  parseLink
}
