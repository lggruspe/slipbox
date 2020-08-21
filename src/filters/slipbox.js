import { strict as assert } from 'assert'
import fs from 'fs'

import Database from 'better-sqlite3'

class Slipbox {
  constructor () {
    this.db = new Database('test.db')
    // TODO assume db has been initialized using slipbox init
    this.initializeSchema()

    const db = this.db
    this.insert = {
      cite: db.prepare('INSERT INTO Citations (note, reference) VALUES (?, ?)'),
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      link: db.prepare('INSERT INTO Links (src, dest, annotation) VALUES (?, ?, ?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)'),
      bib: db.prepare('INSERT INTO Bibliography (key, text) VALUES (?, ?)'),
      tag: db.prepare('INSERT INTO Tags (id, tag) VALUES (?, ?)')
    }
  }

  initializeSchema () {
    const script = fs.readFileSync('test.sql', { encoding: 'utf-8' })
    this.db.exec(script)
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
