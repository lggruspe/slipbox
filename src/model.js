function characterClass (character) {
  const code = character.charCodeAt()
  return code >= 47 && code < 58 ? 'd'
    : code >= 97 && code < 123 ? 'a' : null
}

function isValidAlias (alias) {
  if (alias === null) return true
  if (typeof alias !== 'string') return false
  if (!alias) return false
  if (characterClass(alias.slice(0, 1)) !== 'd') return false
  for (const c of alias) {
    const charClass = characterClass(c)
    if (charClass !== 'd' && charClass !== 'a') {
      return false
    }
  }
  return true
}

function aliasParent (alias) {
  if (!isValidAlias(alias)) return null
  if (alias === null) return null

  const last = characterClass(alias.slice(-1))
  const pattern = last === 'd' ? /^(.*?)[0-9]+$/ : /^(.*?)[a-z]+$/
  return alias.replace(pattern, '$1') || null
}

function isSequence (prev, next) {
  return aliasParent(next) === prev
}

class Database {
  // Schema
  // {
  //   aliases: {
  //     <alias:str>: { id: <int>, children: [<str>], parent: <str> }
  //   },
  //   notes: [
  //     {
  //       title: <str>,
  //       aliases: [<str>],
  //       links: [{ src: <int>, dest: <int>, annotation: <str> }],
  //       backlinks: [<link>]
  //     }
  //   ]
  // }

  constructor () {
    this.data = { aliases: {}, notes: [] }
  }

  add (record) {
    return record.addTo(this)
  }
}

class InvalidAttributeError extends Error {}

function check (condition, message) {
  if (!condition) throw new InvalidAttributeError(message)
}

class Note {
  constructor (id, title) {
    check(Number.isInteger(id), 'invalid Note.id')
    check(typeof title === 'string', 'invalid Note.title')
    check(title, 'empty Note.title')

    this.id = id
    this.title = title
  }

  addTo (db) {
    // Overwrite existing entry in notes.
    db.data.notes[this.id] = {
      title: this.title,
      aliases: [],
      links: [],
      backlinks: []
    }
  }
}

class Alias {
  constructor (id, alias) {
    check(Number.isInteger(id), 'non-integer Alias.id')
    check(typeof alias === 'string', 'non-string Alias.alias')
    check(isValidAlias(alias), 'malformed Alias.alias')
    check(alias, 'empty alias')

    this.id = id
    this.alias = alias
  }

  addTo (db) {
    // Overwrite existing entry in aliases.
    // Note with ID must exist.
    const note = db.data.notes[this.id]
    check(note, 'invalid reference from Alias.id')
    // should this be an exception?

    db.data.aliases[this.alias] = {
      id: this.id,
      children: [],
      parent: null
    }
    note.aliases.push(this.alias)
  }
}

class Sequence {
  constructor (prev, next) {
    check(isValidAlias(prev), 'malformed Sequence.prev')
    check(isValidAlias(next), 'malformed Sequence.next')
    check(isSequence(prev, next),
      'Sequence.prev and Sequence.next not in sequence')
    check(prev != null, 'null Sequence.prev')
    check(next != null, 'null Sequence.next')

    this.prev = prev
    this.next = next
  }

  addTo (db) {
    const prev = db.data.aliases[this.prev]
    const next = db.data.aliases[this.next]
    if (!prev || !next) return

    const prevNote = db.data.notes[prev.id]
    const nextNote = db.data.notes[next.id]
    if (!prevNote || !nextNote) return

    next.parent = this.prev
    prev.children.push(this.next)
  }
}

class Link {
  constructor (src, dest, annotation) {
    check(Number.isInteger(src), 'non-integer Link.src')
    check(Number.isInteger(dest), 'non-integer Link.dest')
    check(typeof annotation === 'string', 'non-string Link.annotation')

    this.src = src
    this.dest = dest
    this.annotation = annotation
  }

  addTo (db) {
    // src and dest notes must exist.
    // Existing entries get overwritten.
    const src = db.data.notes[this.src]
    const dest = db.data.notes[this.dest]
    if (!src || !dest) return

    const link = {
      src: this.src,
      dest: this.dest,
      annotation: this.annotation
    }
    src.links.push(link)
    if (link.annotation) {
      dest.backlinks.push(link)
    }
  }
}

class Query {
  constructor (db) {
    this.db = db
  }

  note (id) {
    id = Number(id)
    if (!Number.isInteger(Number(id))) return null
    const note = this.db.data.notes[id]
    if (!note) return null

    const self = this
    return {
      id: id,
      title: note.title,
      links: () => this.links(id),
      backlinks: () => this.backlinks(id),
      aliases: function * () {
        yield * note.aliases
      },
      parents: function * () {
        for (const alias of note.aliases) {
          const parent = self.parent(alias)
          if (parent) {
            yield parent
          }
        }
      },
      children: function * () {
        for (const alias of note.aliases) {
          yield * self.children(alias)
        }
      }
    }
  }

  * links (id) {
    const src = this.db.data.notes[id] || { links: [] }
    for (const link of src.links) {
      const dest = this.note(link.dest)
      if (dest) {
        yield { note: dest, annotation: link.annotation }
      }
    }
  }

  * backlinks (id) {
    const dest = this.db.data.notes[id] || { backlinks: [] }
    for (const backlink of dest.backlinks) {
      const src = this.note(backlink.src)
      if (src) {
        yield { note: src, annotation: backlink.annotation }
      }
    }
  }

  parent (alias) {
    const parentAlias = this.db.data.aliases[alias].parent
    if (parentAlias) {
      const parentID = this.db.data.aliases[parentAlias].id
      return { note: this.note(parentID), annotation: parentAlias }
    }
  }

  * children (alias) {
    const children = this.db.data.aliases[alias].children || []
    for (const childAlias of children) {
      const childID = this.db.data.aliases[childAlias]
      const child = this.note(childID)
      yield { note: child, annotation: childAlias }
    }
  }
}

export {
  Alias,
  aliasParent,
  Database,
  InvalidAttributeError,
  isSequence,
  Link,
  Note,
  Query,
  Sequence
}
