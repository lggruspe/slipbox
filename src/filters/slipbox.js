import { strict as assert } from 'assert'

import Database from 'better-sqlite3'

class Slipbox {
  constructor () {
    this.db = new Database('test.db', { fileMustExist: true })

    const db = this.db
    this.insert = {
      alias: db.prepare('INSERT INTO Aliases (id, owner, alias) VALUES (?, ?, ?)'),
      bib: db.prepare('INSERT OR IGNORE INTO Bibliography (key, text) VALUES (?, ?)'),
      cite: db.prepare('INSERT INTO Citations (note, reference) VALUES (?, ?)'),
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      link: db.prepare('INSERT INTO Links (src, dest, annotation) VALUES (?, ?, ?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)'),
      sequence: db.prepare('INSERT INTO Sequences (prev, next) VALUES (?, ?)'),
      tag: db.prepare('INSERT INTO Tags (id, tag) VALUES (?, ?)')
    }
  }

  saveNotes (notes) {
    const insertMany = this.db.transaction((notes) => {
      for (const note of Object.entries(notes)) {
        const [id, { title, filename }] = note
        this.insert.file.run(filename)
        this.insert.note.run([id, title, filename])
      }
    })
    insertMany(notes)
  }

  saveCitations (cites) {
    const insertMany = this.db.transaction((cites) => {
      for (const [id, _cites] of Object.entries(cites)) {
        for (const cite of _cites) {
          this.insert.bib.run([cite, '<temp>'])
          this.insert.cite.run([id, cite])
        }
      }
    })
    insertMany(cites)
  }

  saveLinks (links) {
    // TODO handle error if note has duplicate links to a note
    const insertMany = this.db.transaction((links) => {
      for (const { tag, src, dest, description } of links) {
        if (tag === 'direct') {
          this.insert.link.run([src, dest, description])
        } else if (tag === 'sequence') {
          this.insert.alias.run([dest, src, description])
        } else {
          assert(false)
        }
      }
    })
    insertMany(links)
  }

  saveTags (tags) {
    const insertMany = this.db.transaction((tags) => {
      for (const [id, tag] of tags) {
        this.insert.tag.run([id, tag])
      }
    })
    insertMany(tags)
  }
}

export { Slipbox }
