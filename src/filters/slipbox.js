import fs from 'fs'

import Database from 'better-sqlite3'

class Slipbox {
  constructor () {
    this.db = new Database('test.db')
    // TODO assume db has been initialized using slipbox init
    this.initializeSchema()

    const db = this.db
    this.insert = {
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)')
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
}

export { Slipbox }
