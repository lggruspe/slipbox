class Database {
  // Schema
  // {
  //   clusters: {
  //     [tag: string]: {
  //       forward: {
  //         [src: number]: Array<number>
  //       },
  //       reverse: {
  //         [dest: number]: Array<number>
  //       }
  //     }
  //   }
  //   notes: [
  //     {
  //       title: <str>,
  //       filename: <str>,
  //       links: [{ src: <int>, dest: <int>, tag: <str> }],
  //       backlinks: [<link>]
  //     }
  //   ]
  // }

  constructor () {
    this.data = { notes: [], clusters: [] }
  }

  add (record) {
    return record.addTo(this) || record
  }
}

class IntegrityError extends Error {}
class DomainError extends IntegrityError {}
class ReferenceError extends IntegrityError {}

function check (condition, message) {
  if (!condition) throw new DomainError(message)
}

class Note {
  constructor (id, title, filename) {
    check(typeof id === 'number', 'non-number Note.id')
    check(Number.isInteger(id), 'invalid Note.id')
    check(typeof title === 'string', 'invalid Note.title')
    check(typeof filename === 'string', 'invalid Note.filename')
    check(title, 'empty Note.title')
    check(filename, 'missing Note.filename')
    this.id = id
    this.title = title
    this.filename = filename
  }

  addTo (db) {
    // Overwrite existing entry in notes.
    db.data.notes[this.id] = {
      title: this.title,
      filename: this.filename,
      links: [],
      backlinks: []
    }
  }

  equals (note) {
    return this.id === note.id && this.title === note.title && this.filename === note.filename
  }
}

class Link {
  constructor (src, dest, tag) {
    check(src instanceof Note, 'invalid src Note')
    check(dest instanceof Note, 'invalid dest Note')
    check(tag === null || typeof tag === 'string', 'invalid Link.tag')
    this.src = src
    this.dest = dest
    this.tag = tag
  }

  addTo (db) {
    const src = db.data.notes[this.src.id]
    const dest = db.data.notes[this.dest.id]
    if (!src) return new ReferenceError('Link.src')
    if (!dest) return new ReferenceError('Link.dest')

    // Existing entries get overwritten.
    const link = {
      src: this.src,
      dest: this.dest,
      tag: this.tag
    }
    if (this.src.id !== this.dest.id) {
      src.links.push(link)
      dest.backlinks.push(link)
    }
    if (this.tag) {
      const result = db.data.clusters[this.tag] || {
        forward: {},
        reverse: {}
      }
      const forward = result.forward[this.src.id] || []
      const reverse = result.reverse[this.dest.id] || []
      forward.push(this.dest.id)
      reverse.push(this.src.id)
      result.forward[this.src.id] = forward
      result.reverse[this.dest.id] = reverse
      db.data.clusters[this.tag] = result
    }
  }
}

class Query {
  constructor (db) {
    this.db = db
  }

  note (id) {
    const record = this.db.data.notes[id]
    if (!record) return null
    const note = new Note(id, record.title, record.filename)
    note.links = () => this.links(note)
    note.backlinks = () => this.backlinks(note)
    return note
  }

  * links (note) {
    const src = this.db.data.notes[note.id]
    if (src && src.links) {
      yield * src.links
    }
  }

  * backlinks (note) {
    const dest = this.db.data.notes[note.id]
    if (dest && dest.backlinks) {
      yield * dest.backlinks
    }
  }
}

export {
  Database,
  DomainError,
  Link,
  Note,
  Query,
  ReferenceError
}
