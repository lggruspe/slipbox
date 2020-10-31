import {
  Database,
  DomainError,
  Link,
  Note,
  Query,
  ReferenceError
} from '../src/model.js'

import assert from 'assert'

describe('Note', function () {
  describe('with invalid note attributes', function () {
    it('should raise DomainError', function () {
      assert.throws(() => new Note('1', null, 'test.md'), DomainError)
      assert.throws(() => new Note(2, '', 'test.md'), DomainError)
      assert.throws(() => new Note('3', 'Title', 'test.md'), DomainError)
      assert.throws(() => new Note(3, 'Title'), DomainError)
      assert.throws(() => new Note(3, 'Title', ''), DomainError)
    })
  })

  describe('with valid note attributes', function () {
    it('should not raise errors', function () {
      const note = new Note(0, 'Title', 'test.md')
      assert.strictEqual(note.id, 0)
      assert.strictEqual(note.title, 'Title')
      assert.strictEqual(note.filename, 'test.md')
    })
  })
})

describe('Database', function () {
  let db = null

  beforeEach(function () {
    db = new Database()
  })

  describe('add Note', function () {
    it('sanity check', function () {
      assert.strictEqual(db.data.notes.length, 0)
      db.add(new Note(0, 'title', 'test.md'))
      assert.strictEqual(db.data.notes.length, 1)
    })

    describe('with duplicate ID', function () {
      it('should overwrite existing entry', function () {
        db.add(new Note(0, 'oops', 'test.md'))
        db.add(new Note(0, 'yay', 'test.md'))
        assert.strictEqual(db.data.notes.length, 1)
        const note = db.data.notes[0]
        assert(note)
        assert.strictEqual(note.title, 'yay')
      })
    })
  })

  describe('add Link', function () {
    describe('with malformed attributes', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'src', 'test.md'))
        db.add(new Note(1, 'dest', 'test.md'))

        assert.throws(
          () => db.add(new Link(0, 1, null)),
          DomainError)

        assert.throws(
          () => db.add(new Link(0, null, 'oops')),
          DomainError)

        assert.throws(
          () => db.add(new Link(null, 1, 'oops')),
          DomainError)

        assert(db.data.notes[0].links.length === 0)
        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].links.length === 0)
        assert(db.data.notes[1].backlinks.length === 0)
      })
    })

    describe('between nonexistent notes', function () {
      it('should be ignored', function () {
        const n0 = db.add(new Note(0, 'note 0', 'test.md'))
        const n1 = new Note(1, 'note 1', 'test.md')

        db.add(new Link(n0, n1, 'oops'))
        db.add(new Link(n1, n0, 'oops'))

        assert(db.data.notes[0].links.length === 0)
        assert(db.data.notes[0].backlinks.length === 0)
      })
    })

    describe('with tag', function () {
      it('should generate backlink', function () {
        const n0 = db.add(new Note(0, 'src', 'test.md'))
        const n1 = db.add(new Note(1, 'dest', 'test.md'))
        db.add(new Link(n0, n1, 'tag'))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === n1)
        assert(db.data.notes[0].links[0].tag === 'tag')

        assert(db.data.notes[1].links.length === 0)

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 1)

        assert.strictEqual(
          db.data.notes[1].backlinks[0],
          db.data.notes[0].links[0])
      })
    })

    describe('without tag', function () {
      it('should also generate backlink', function () {
        const n0 = db.add(new Note(0, 'src', 'test.md'))
        const n1 = db.add(new Note(1, 'dest', 'test.md'))
        db.add(new Link(n0, n1, ''))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === n1)
        assert(db.data.notes[0].links[0].tag === '')

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 1)

        assert.strictEqual(
          db.data.notes[0].links[0],
          db.data.notes[1].backlinks[0]
        )
      })
    })
  })
})

describe('Query', function () {
  const query = new Query(new Database())
  const n0 = query.db.add(new Note(0, 'Note 0', 'test.md'))
  const n1 = query.db.add(new Note(1, 'Note 1', 'test.md'))
  const n2 = query.db.add(new Note(2, 'Note 2', 'test.md'))
  query.db.add(new Link(n0, n1, '0->1'))
  query.db.add(new Link(n1, n2, ''))

  describe('note', function () {
    describe('non-integer ID', function () {
      it('should return null', function () {
        assert(query.note('invalid') === null)
      })
    })

    describe('integer ID', function () {
      it('should return note with integer ID', function () {
        const note = query.note(0)
        assert.strictEqual(note.title, 'Note 0')
        assert.strictEqual(note.id, 0)
        assert.strictEqual(typeof note.links, 'function')
        assert.strictEqual(typeof note.backlinks, 'function')
      })
    })

    describe('missing integer ID', function () {
      it('should return null', function () {
        assert(query.note('1000') === null)
      })
    })
  })

  describe('links', function () {
    describe('from non-existent note', function () {
      it("shouldn't yield anything", function () {
        const result = Array.from(query.links(new Note(1000, 'title', 'test.md')))
        assert(result.length === 0)
      })
    })

    describe('valid note ID', function () {
      it('should return direct links from the note', function () {
        const result = Array.from(query.links(n0))
        assert.strictEqual(result.length, 1)
        assert.strictEqual(result[0].dest, n1)
      })
    })
  })

  describe('backlinks', function () {
    it('should yield annotated links', function () {
      const result = Array.from(query.backlinks(n1))
      assert.strictEqual(result.length, 1)
      assert.strictEqual(result[0].src, n0)
    })

    it('should yield unannotated links too', function () {
      const backlinks = Array.from(query.backlinks(n2))
      assert.strictEqual(backlinks.length, 1)

      // even if there are forward links
      const links = Array.from(query.links(n1))
      assert.strictEqual(links.length, 1)
      assert.strictEqual(links[0].dest, n2)

      assert.strictEqual(backlinks[0].src, n1)
    })
  })
})

describe('Query.note', function () {
  let query = null

  beforeEach(function () {
    query = new Query(new Database())
    const n0 = query.db.add(new Note(0, 'note 0', 'test.md'))
    const n1 = query.db.add(new Note(1, 'note 1', 'test.md'))
    const n2 = query.db.add(new Note(2, 'note 2', 'test.md'))

    query.db.add(new Link(n0, n1, '0->1'))
    query.db.add(new Link(n1, n2, '1->2'))
  })

  describe('links', function () {
    it('should work once', function () {
      const n0 = query.note(0)
      assert(n0)
      assert(n0.links)

      const result = Array.from(n0.links())
      assert.strictEqual(result.length, 1)
    })

    it('should also work twice', function () {
      const n0 = query.note(0)
      assert(Array.from(n0.links()).length === 1)
      assert(Array.from(n0.links()).length === 1)
    })
  })

  describe('backlinks', function () {
    it('should work once', function () {
      const n1 = query.note(1)
      assert(n1)
      assert(n1.links)

      const result = Array.from(n1.links())
      assert.strictEqual(result.length, 1)
    })

    it('should also work twice', function () {
      const n1 = query.note(1)
      assert(Array.from(n1.links()).length === 1)
      assert(Array.from(n1.links()).length === 1)
    })
  })
})
