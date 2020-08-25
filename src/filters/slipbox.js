import { strict as assert } from 'assert'
import * as process from 'process'

import Database from 'better-sqlite3'

import { warning } from './log.js'
import { parentAlias } from './utils.js'

class Slipbox {
  constructor () {
    const path = process.env.SLIPBOX_DB || 'slipbox.db'
    this.db = new Database(path, { fileMustExist: true })

    const db = this.db
    this.insert = {
      alias: db.prepare('INSERT OR IGNORE INTO Aliases (id, owner, alias) VALUES (?, ?, ?)'),
      bib: db.prepare('INSERT OR IGNORE INTO Bibliography (key, text) VALUES (?, ?)'),
      cite: db.prepare('INSERT INTO Citations (note, reference) VALUES (?, ?)'),
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      link: db.prepare('INSERT INTO Links (src, dest, annotation) VALUES (?, ?, ?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)'),
      sequence: db.prepare('INSERT OR IGNORE INTO Sequences (prev, next) VALUES (?, ?)'),
      tag: db.prepare('INSERT OR IGNORE INTO Tags (id, tag) VALUES (?, ?)')
    }
    this.select = {
      alias: db.prepare('SELECT id, owner, alias FROM Aliases'),
      note: db.prepare('SELECT id, title, filename FROM Notes WHERE id = ?')
    }
  }

  saveNotes (notes) {
    const insertMany = this.db.transaction((notes) => {
      for (const note of Object.entries(notes)) {
        const [id, { title, filename }] = note
        this.insert.file.run(filename)
        try {
          this.insert.note.run([id, title, filename])
        } catch (error) {
          const existing = this.select.note.get(id)
          assert(existing)
          const messages = [
            `Duplicate ID: ${id}.`,
            `Could not insert note '${title}'.`,
            `Note '${existing.title}' already uses the ID.`,
            `See '${filename}' or '${existing.filename}'.`
          ]
          warning(messages)
        }
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

  saveAliases (aliases) {
    const insertMany = this.db.transaction((aliases) => {
      for (const [alias, { id, owner }] of Object.entries(aliases)) {
        this.insert.alias.run([owner, owner, String(owner)])
        this.insert.alias.run([id, owner, alias])
        const parent = parentAlias(alias)
        if (parent != null) {
          this.insert.sequence.run([parent, alias])
        }
      }
    })
    insertMany(aliases)
  }

  saveLinks (links) {
    // TODO handle error if note has duplicate links to a note
    const insertMany = this.db.transaction((links) => {
      for (const { tag, src, dest, description } of links) {
        assert(tag === 'direct')
        this.insert.link.run([src, dest, description])
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
