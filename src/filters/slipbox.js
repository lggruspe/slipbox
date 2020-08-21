import fs from 'fs'

import Database from 'better-sqlite3'

class Slipbox {
  constructor () {
    this.db = new Database('test.db', { verbose: console.error })
    // TODO assume schema has been initialized using slipbox init
    this.initializeSchema()

    const db = this.db
    this.insert = {
      file: db.prepare('INSERT OR IGNORE INTO Files (filename) VALUES (?)'),
      note: db.prepare('INSERT INTO Notes (id, title, filename) VALUES (?, ?, ?)'),
    }
  }

  initializeSchema () {
    const script = fs.readFileSync('test.sql', { encoding: 'utf-8' })
    this.db.exec(script)
  }

  saveNote (id, title, filename) {
    this.insert.file.run(filename)
    this.insert.note.run([id, title, filename])
  }
}

export { Slipbox }
