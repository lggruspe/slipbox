import { strict as assert } from 'assert'

import Database from 'better-sqlite3'

class Slipbox {
  constructor () {
    this.db = new Database('test.db', { fileMustExist: true })

    const db = this.db
    this.insert = {
      cite: db.prepare('INSERT INTO Citations (note, reference) VALUES (?, ?)'),
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      link: db.prepare('INSERT INTO Links (src, dest, annotation) VALUES (?, ?, ?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)'),
      bib: db.prepare('INSERT OR IGNORE INTO Bibliography (key, text) VALUES (?, ?)'),
      tag: db.prepare('INSERT INTO Tags (id, tag) VALUES (?, ?)')
    }
  }

  saveNotes (notes) {
    const insertMany = this.db.transaction((notes) => {
      for (const note of notes) {
        this.insert.file.run(note[2])
        this.insert.note.run(note)
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
