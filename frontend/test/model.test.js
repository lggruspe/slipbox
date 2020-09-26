import {
  Cluster,
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

describe('Cluster', function () {
  describe('with invalid tag', function () {
    it('should raise DomainError', function () {
      assert.throws(() => new Cluster(null, 0, 0), DomainError)
      assert.throws(() => new Cluster('', 0, 0), DomainError)
    })
  })

  describe('with invalid src or dest', function () {
    it('should raise DomainError', function () {
      assert.throws(() => new Cluster('#tag', null, 0), DomainError)
      assert.throws(() => new Cluster('#tag', '0', 0), DomainError)
      assert.throws(() => new Cluster('#tag', 0, null), DomainError)
      assert.throws(() => new Cluster('#tag', 0, '0'), DomainError)
      assert.throws(() => new Cluster('#tag', 0, '#test', 'N'))
      assert.throws(() => new Cluster('#tag', 0, 1, 'T'))
    })
  })

  describe('with invalid destType', function () {
    it('should raise DomainError', function () {
      assert.throws(() => new Cluster('#tag', 0, 1, 'n'))
      assert.throws(() => new Cluster('#tag', 0, '#test', 't'))
    })
  })

  describe('with valid arguments', function () {
    it('should create Cluster object', function () {
      const cluster = new Cluster('#tag', 0, 0)
      assert.strictEqual(cluster.tag, '#tag')
      assert.strictEqual(cluster.src, 0)
      assert.strictEqual(cluster.dest, 0)
      assert.strictEqual(cluster.destType, 'N')

      const clusterT = new Cluster('#tag', 0, '#test', 'T')
      assert.strictEqual(clusterT.tag, '#tag')
      assert.strictEqual(clusterT.src, 0)
      assert.strictEqual(clusterT.dest, '#test')
      assert.strictEqual(clusterT.destType, 'T')
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

  describe('add Cluster', function () {
    let notes = []
    beforeEach(function () {
      notes = []
      for (let i = 0; i < 4; i++) {
        notes.push(db.add(new Note(i, String(i), 'test.md')))
      }
    })

    describe('with non-existent notes', function () {
      it('should return Reference error', function () {
        const cluster = new Cluster('#test', 9000, 9000)
        assert(db.add(cluster) instanceof ReferenceError)
      })
    })

    it('should add cluster', function () {
      db.add(new Cluster('#test', 0, 1))
      db.add(new Cluster('#test', 1, 2))
      db.add(new Cluster('#foo', 2, 3))

      const clusters = db.data.clusters
      const tags = Object.keys(clusters)
      assert.strictEqual(tags.length, 2)
      assert(tags.includes('#test'))
      assert(tags.includes('#foo'))

      const test = clusters['#test']
      assert(test.forward[0].includes(1))
      assert(test.forward[1].includes(2))
      assert(test.reverse[1].includes(0))
      assert(test.reverse[2].includes(1))
      assert.strictEqual(test.forward[0].length, 1)
      assert.strictEqual(test.forward[1].length, 1)
      assert.strictEqual(test.reverse[1].length, 1)
      assert.strictEqual(test.reverse[2].length, 1)

      const foo = clusters['#foo']
      assert(foo.forward[2].includes(3))
      assert(foo.reverse[3].includes(2))
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

    describe('with annotation', function () {
      it('should generate backlink', function () {
        const n0 = db.add(new Note(0, 'src', 'test.md'))
        const n1 = db.add(new Note(1, 'dest', 'test.md'))
        db.add(new Link(n0, n1, 'annotation'))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === n1)
        assert(db.data.notes[0].links[0].annotation === 'annotation')

        assert(db.data.notes[1].links.length === 0)

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 1)

        assert.strictEqual(
          db.data.notes[1].backlinks[0],
          db.data.notes[0].links[0])
      })
    })

    describe('without annotation', function () {
      it('should also generate backlink', function () {
        const n0 = db.add(new Note(0, 'src', 'test.md'))
        const n1 = db.add(new Note(1, 'dest', 'test.md'))
        db.add(new Link(n0, n1, ''))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === n1)
        assert(db.data.notes[0].links[0].annotation === '')

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
