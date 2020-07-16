import {
  Alias,
  aliasParent,
  Database,
  DomainError,
  isSequence,
  Link,
  Note,
  Query,
  ReferenceError,
  Sequence
} from '../src/model.js'

import assert from 'assert'

it('aliasParent', function () {
  assert.strictEqual(aliasParent('1a'), '1')
  assert.strictEqual(aliasParent('2'), null)
  assert.strictEqual(aliasParent(null), null)
  assert.strictEqual(aliasParent(undefined), null)
  assert.strictEqual(aliasParent(''), null)
})

it('isSequence', function () {
  assert(isSequence('1', '1a'))
  assert(isSequence('2', '2b'))
  assert(isSequence('3', '3abc'))
  assert(!isSequence('4a', '4b'))
  assert(!isSequence('5c', '5'))
  assert(!isSequence('', '6'))

  assert(isSequence(null, '7'))

  assert(!isSequence('', ''))
  assert(isSequence(null, null))
})

describe('Database', function () {
  let db = null

  beforeEach(function () {
    db = new Database()
  })

  describe('add Note', function () {
    describe('with invalid note attributes', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'title'))

        assert.throws(
          () => db.add(new Note('1', null)),
          DomainError)

        assert.throws(
          () => db.add(new Note(2, '')),
          DomainError)

        assert.strictEqual(db.data.notes.length, 1)
      })
    })

    describe('with duplicate ID', function () {
      it('should overwrite existing entry', function () {
        db.add(new Note(0, 'oops'))
        db.add(new Note(0, 'yay'))
        assert.strictEqual(db.data.notes.length, 1)
        const note = db.data.notes[0]
        assert(note)
        assert.strictEqual(note.title, 'yay')
      })
    })
  })

  describe('add Alias', function () {
    describe('with malformed alias', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'foo'))
        db.add(new Note(1, 'bar'))
        db.add(new Note(2, 'baz'))
        db.add(new Alias(0, '2a'))
        db.add(new Alias(2, '123abc'))

        assert.throws(
          () => db.add(new Alias(1, 'a1')),
          DomainError)

        assert(db.data.notes.length === 3)
        assert(db.data.notes[0].aliases.length === 1)
        assert.equal(db.data.notes[1].aliases.length, 0)
        assert(db.data.notes[2].aliases.length === 1)

        assert(db.data.notes[0].aliases.includes('2a'))
        assert(db.data.notes[2].aliases.includes('123abc'))
      })
    })

    describe('for nonexistent note', function () {
      it('should return ReferenceError', function () {
        assert(db.add(new Alias(0, '1a')) instanceof ReferenceError)
        assert(db.data.notes.length === 0)
        assert(!db.data.aliases['1a'])
      })
    })
  })

  describe('add Sequence', function () {
    describe('with malformed aliases', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'parent'))
        db.add(new Note(1, 'child'))
        db.add(new Alias(0, '2'))
        db.add(new Alias(0, '2a'))
        db.add(new Sequence('2', '2a'))

        assert.throws(
          () => db.add(new Sequence('2', 'b')),
          DomainError)

        assert.throws(
          () => db.add(new Sequence(null, null)),
          DomainError)

        assert(!db.data.aliases.b)
        assert.equal(db.data.aliases['2'].children.length, 1)
        assert(db.data.aliases['2'].children.includes('2a'))
      })
    })

    describe('with null aliases', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'note'))
        db.add(new Alias(0, '2'))

        assert.throws(
          () => db.add(new Sequence(null, '2')),
          DomainError)

        assert(db.data.aliases['2'].parent === null)

        assert.throws(
          () => db.add(new Sequence('', '2')),
          DomainError)

        assert(db.data.aliases['2'].parent === null)
      })
    })

    describe('with nonexistent aliases', function () {
      it('should be ignored', function () {
        db.add(new Sequence('0', '0a'))
        assert(!db.data.aliases['0'])
        assert(!db.data.aliases['0a'])
      })
    })

    describe('with non-sequential aliases', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'parent'))
        db.add(new Note(1, 'child'))
        db.add(new Alias(0, '2'))
        db.add(new Alias(1, '2a'))

        assert.throws(
          () => db.add(new Sequence('2a', '2')),
          DomainError)

        assert.throws(
          () => db.add(new Sequence('2', '3')),
          DomainError)

        assert(db.data.aliases['2'].children.length === 0)
        assert(db.data.aliases['2a'].children.length === 0)
        assert(db.data.aliases['2'].parent === null)
        assert(db.data.aliases['2a'].parent === null)
      })
    })

    it('with valid aliases', function () {
      db.add(new Note(0, 'parent'))
      db.add(new Note(1, 'child'))
      db.add(new Alias(0, '2'))
      db.add(new Alias(1, '2b'))
      db.add(new Sequence('2', '2b'))

      assert(db.data.aliases['2'].id === 0)
      assert.equal(db.data.aliases['2'].children.length, 1)
      assert(db.data.aliases['2'].children.includes('2b'))
      assert(db.data.aliases['2'].parent === null)

      assert(db.data.aliases['2b'].id === 1)
      assert(db.data.aliases['2b'].children.length === 0)
      assert(db.data.aliases['2b'].parent === '2')
    })
  })

  describe('add Link', function () {
    describe('with malformed attributes', function () {
      it('should raise DomainError', function () {
        db.add(new Note(0, 'src'))
        db.add(new Note(1, 'dest'))

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
        const n0 = db.add(new Note(0, 'note 0'))
        const n1 = new Note(1, 'note 1')

        db.add(new Link(n0, n1, 'oops'))
        db.add(new Link(n1, n0, 'oops'))

        assert(db.data.notes[0].links.length === 0)
        assert(db.data.notes[0].backlinks.length === 0)
      })
    })

    describe('without annotation', function () {
      it('should not generate backlink', function () {
        const n0 = db.add(new Note(0, 'src'))
        const n1 = db.add(new Note(1, 'dest'))
        db.add(new Link(n0, n1, ''))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === n1)
        assert(db.data.notes[0].links[0].annotation === '')

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 0)
      })
    })

    describe('with annotation', function () {
      it('should generate backlink', function () {
        const n0 = db.add(new Note(0, 'src'))
        const n1 = db.add(new Note(1, 'dest'))
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
  })
})

describe('Query', function () {
  const query = new Query(new Database())
  const n0 = query.db.add(new Note(0, 'Note 0'))
  const n1 = query.db.add(new Note(1, 'Note 1'))
  const n2 = query.db.add(new Note(2, 'Note 2'))
  query.db.add(new Link(n0, n1, '0->1'))
  query.db.add(new Link(n1, n2, ''))
  query.db.add(new Alias(1, '0a'))
  query.db.add(new Alias(2, '0a1'))
  const s = query.db.add(new Sequence('0a', '0a1'))

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
        assert.strictEqual(typeof note.aliases, 'function')
        assert.strictEqual(typeof note.parents, 'function')
        assert.strictEqual(typeof note.children, 'function')
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
        const result = Array.from(query.links(new Note(1000, 'title')))
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

    it("shouldn't yield unannotated links", function () {
      const backlinks = Array.from(query.backlinks(n2))
      assert.strictEqual(backlinks.length, 0)

      // even if there are forward links
      const links = Array.from(query.links(n1))
      assert.strictEqual(links.length, 1)
      assert.strictEqual(links[0].dest, n2)
    })
  })

  describe('parent', function () {
    describe('of non-existent alias', function () {
      it('should be null', function () {
        assert(query.parent('1') === null)
      })
    })

    describe('of alias with no parent', function () {
      it('should be null', function () {
        assert(query.db.data.aliases['0a'])
        assert(query.parent('0a') === null)
      })
    })

    it('should return Note and alias', function () {
      const parent = query.parent('0a1')
      assert(parent.note.equals(n1))
      assert.strictEqual(parent.alias, '0a')
    })
  })

  describe('children', function () {
    describe('of non-existent alias', function () {
      it("shouldn't yield anything", function () {
        const result = Array.from(query.children('1a'))
        assert(result.length === 0)
      })
    })

    describe('of alias with no children', function () {
      it("shouldn't yield anything", function () {
        const result = Array.from(query.children('0a1'))
        assert(result.length === 0)
      })
    })

    it('should yield Note and alias', function () {
      const result = Array.from(query.children('0a'))
      assert.strictEqual(result.length, 1)
      assert(result[0].note.equals(n2))
      assert.strictEqual(result[0].alias, '0a1')
    })
  })
})

describe('Query.note', function () {
  let query = null

  beforeEach(function () {
    query = new Query(new Database())
    const n0 = query.db.add(new Note(0, 'note 0'))
    const n1 = query.db.add(new Note(1, 'note 1'))
    const n2 = query.db.add(new Note(2, 'note 2'))

    query.db.add(new Link(n0, n1, '0->1'))
    query.db.add(new Link(n1, n2, '1->2'))

    query.db.add(new Alias(0, '0'))
    query.db.add(new Alias(1, '0a'))
    query.db.add(new Alias(1, '1'))
    query.db.add(new Alias(2, '0a1'))
    query.db.add(new Alias(2, '1a'))

    query.db.add(new Sequence('0', '0a'))
    query.db.add(new Sequence('0a', '0a1'))
    query.db.add(new Sequence('1', '1a'))
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

  it('aliases', function () {
    const n2 = query.note(2)
    const result = Array.from(n2.aliases())
    assert(result.length === 2)
    assert(result.includes('0a1'))
    assert(result.includes('1a'))

    const again = Array.from(n2.aliases())
    assert(again.length === 2)
    assert(again.includes('0a1'))
    assert(again.includes('1a'))
  })

  describe('parents', function () {
    it('of every alias', function () {
      const n1 = query.note(1)
      const n2 = query.note(2)

      const compareFn = (a, b) => a < b ? -1 : a === b ? 0 : 1

      const result = Array.from(n2.parents()).sort(compareFn)
      assert.strictEqual(result.length, 2)
      assert(result[0].note.equals(n1))
      assert(result[0].alias === '0a')
      assert(result[1].note.equals(n1))
      assert(result[1].alias === '1')

      const again = Array.from(n2.parents()).sort(compareFn)
      assert(again[0].note.equals(n1))
      assert(again[0].alias === '0a')
      assert(again[1].note.equals(n1))
      assert(again[1].alias === '1')
    })
  })

  describe('children', function () {
    it('of every alias', function () {
      const n1 = query.note(1)
      const n2 = query.note(2)

      const compareFn = (a, b) => a < b ? -1 : a === b ? 0 : 1

      const result = Array.from(n1.children()).sort(compareFn)
      assert.strictEqual(result.length, 2)
      assert(result[0].note.equals(n2))
      assert(result[0].alias === '0a1')
      assert(result[1].note.equals(n2))
      assert(result[1].alias === '1a')

      const again = Array.from(n1.children()).sort(compareFn)
      assert(again[0].note.equals(n2))
      assert(again[0].alias === '0a1')
      assert(again[1].note.equals(n2))
      assert(again[1].alias === '1a')
    })
  })
})
