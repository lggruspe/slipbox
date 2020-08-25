import { strict as assert } from 'assert'

function warning (messages) {
  assert(messages.length > 0)
  console.error(`[WARNING] ${messages[0]}`)
  for (let i = 1; i < messages.length; i++) {
    console.error(`  ${messages[i]}`)
  }
}

export { warning }
