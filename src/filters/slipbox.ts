import { strict as assert } from 'assert'
import * as process from 'process'

import Database from 'better-sqlite3'

import { warning } from './log.js'
import { parentAlias } from './utils.js'

export class Slipbox {
  db: Database.Database
  insert: { [key: string]: Database.Statement }
  update: { [key: string]: Database.Statement }
  select: { [key: string]: Database.Statement }
  notes: { [id: string]: { title: string, filename: string } } = {}
  citations: { [id: string]: Set<string> } = {}
  aliases: { [alias: string]: { id: string, owner: string } } = {}
  sequences: Array<[string, string]> = []
  links: Array<{ tag: string, src: string, dest: string, description: string }> = []
  tags: Array<[string, string]> = []
  references: Array<[string, string]> = []
  errors: {
    hasEmptyLink: Set<string>
  } = { hasEmptyLink: new Set() }

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
    this.update = {
      bib: db.prepare('UPDATE Bibliography SET text = ? WHERE key = ?')
    }
    this.select = {
      note: db.prepare('SELECT id, title, filename FROM Notes WHERE id = ?'),
      noteFromAlias: db.prepare(
        'SELECT id, title, filename FROM Notes JOIN Aliases USING (id) WHERE alias = ?'
      )
    }
  }

  saveNote (id: string, title: string, filename: string) {
    const existing = this.notes[id]
    if (existing == null) {
      this.notes[id] = { title, filename }
    } else {
      warning([
        `Duplicate ID: ${id}.`,
        `Could not insert note '${title}'.`,
        `Note '${existing.title}' already uses the ID.`
      ])
    }
  }

  saveCite (id: string, ref: string) {
    const rec = new Set(this.citations[id] || [])
    rec.add('ref-' + ref)
    this.citations[id] = rec
  }

  saveAlias (alias: string, id: string, owner: string) {
    const existing = this.aliases[alias]
    if (existing && existing.id !== id) {
      warning([
        `Duplicate alias definition for '${alias}' used by note ${existing.id}.`,
        `It will not be used as an alias for note ${id}.`
      ])
    } else {
      this.aliases[alias] = { id, owner }
      const prev = parentAlias(alias)
      if (prev != null) {
        this.sequences.push([prev, alias])
      }
    }
  }

  saveLink (src: string, dest: string, description: string) {
    this.links.push({ tag: 'direct', src, dest, description })
  }

  saveTag (id: string, tag: string) {
    this.tags.push([id, tag])
  }

  saveNotes () {
    const insertMany = this.db.transaction(() => {
      for (const note of Object.entries(this.notes)) {
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
    insertMany()
    this.notes = {} // ???
  }

  saveCitations () {
    const insertMany = this.db.transaction(() => {
      for (const [id, _cites] of Object.entries(this.citations)) {
        _cites.forEach(cite => {
          this.insert.bib.run([cite, ''])
          this.insert.cite.run([id, cite])
        })
      }
    })
    insertMany()
    this.citations = {} // ???
  }

  saveAliases () {
    const insertMany = this.db.transaction(() => {
      for (const [alias, { id, owner }] of Object.entries(this.aliases)) {
        this.insert.alias.run([owner, owner, String(owner)])
        this.insert.alias.run([id, owner, alias])
      }
    })
    insertMany()
    this.aliases = {} // ???
  }

  saveSequences () {
    const insertMany = this.db.transaction(() => {
      for (const [prev, next] of this.sequences) {
        assert(prev && next)
        try {
          this.insert.sequence.run([prev, next])
        } catch (error) {
          // NOTE assume prev is the missing alias
          const existing = this.select.noteFromAlias.get(next)
          assert(existing)
          warning([
            `Missing note alias: '${prev}'.`,
            `Note ${existing.id} with alias '${next}' will be unreachable.`
          ])
          // TODO What if note with parent alias with be added in the
          // next batch (i.e. has different file extension)?
        }
      }
    })
    insertMany()
    this.sequences = [] // ???
  }

  saveLinks () {
    // TODO handle error if note has duplicate links to a note
    const insertMany = this.db.transaction(() => {
      for (const { tag, src, dest, description } of this.links) {
        assert(tag === 'direct')
        this.insert.link.run([src, dest, description])
      }
    })
    insertMany()
    this.links = [] // ???
  }

  saveTags () {
    const insertMany = this.db.transaction(() => {
      for (const [id, tag] of this.tags) {
        this.insert.tag.run([id, tag])
      }
    })
    insertMany()
    this.tags = [] // ???
  }

  saveReferences (references: Array<[string, string]>) {
    const insertMany = this.db.transaction(() => {
      for (const [key, text] of references) {
        this.update.bib.run([text, key])
      }
    })
    insertMany()
  }

  hasEmptyLink (id: string) {
    this.errors.hasEmptyLink.add(id)
  }

  checkEmptyLinks () {
    const ids = Array.from(this.errors.hasEmptyLink).map(x => `'${x}'`).join(', ')
    const result = this.db.prepare(`
      SELECT id, title, filename
      FROM Notes
      WHERE id IN (${ids})
      ORDER BY id
    `).all()
    const messages = ['The notes below contain links with an empty target.']
    for (const { id, title, filename } of result) {
      messages.push(`${id}. ${title} in '${filename}'.`)
    }
    if (messages.length > 1) {
      warning(messages)
    }
  }
}
