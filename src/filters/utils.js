const HEADER_PATTERN = /^\s*(\d+)\s+(.+?)\s*$/g
const HEADER_REGEX = new RegExp(HEADER_PATTERN)

function parseHeaderText (text) {
  const result = HEADER_REGEX.exec(text)
  if (result != null && result.length === 3) {
    HEADER_REGEX.lastIndex = 0
    return { id: Number(result[1]), title: result[2] }
  }
  HEADER_REGEX.lastIndex = 0
  return { id: null, title: null }
}

export {
  parseHeaderText
}
