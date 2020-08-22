import { execSync } from 'child_process'

function grepHeaders () {
  const inputs = process.env.SCAN_INPUT_LIST || ''
  const grep = process.env.GREP || 'grep'
  const options = String.raw` -rIoZH "[0-9]\+\s\+.\+" ` + inputs
  // console.error(options)
  const command = grep + options
  return execSync(command, { encoding: 'utf-8' })
}

const GREP_OUTPUT_PATTERN = /^(.+)\0(\d+)\s+(.+)$/
const GREP_OUTPUT_REGEX = new RegExp(GREP_OUTPUT_PATTERN)
function parseGrepLine (line) {
  const result = GREP_OUTPUT_REGEX.exec(line)
  if (!result) return [null, null, null]

  const [filename, id, title] = result.slice(1, 4)
  return [id, title, filename]
}

function * parseGrepOutput (results) {
  const lines = results.split('\n')
  for (const line of lines) {
    const [id, title, filename] = parseGrepLine(line)
    if (id != null && title && filename) {
      yield [id, title, filename]
    }
  }
}

function matchFilenames (notes) {
  const results = grepHeaders()
  for (const result of parseGrepOutput(results)) {
    const [id, title, filename] = result
    const note = notes[id]
    // TODO show error if titles don't match
    if (note && title.slice(1) === note.title) {
      note.filename = filename
    }
  }
}

export { matchFilenames }
