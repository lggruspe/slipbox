import {
  Alias,
  aliasParent,
  Database,
  InvalidAttributeError,
  isSequence,
  Link,
  Note,
  Query,
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
      it('should be ignored', function () {
        db.add(new Note(0, 'title'))

        assert.throws(
          () => db.add(new Note('1', null)),
          InvalidAttributeError)

        assert.throws(
          () => db.add(new Note(2, '')),
          InvalidAttributeError)

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
      it('should be ignored', function () {
        db.add(new Note(0, 'foo'))
        db.add(new Note(1, 'bar'))
        db.add(new Note(2, 'baz'))
        db.add(new Alias(0, '2a'))
        db.add(new Alias(2, '123abc'))

        assert.throws(
          () => db.add(new Alias(1, 'a1')),
          InvalidAttributeError)

        assert(db.data.notes.length === 3)
        assert(db.data.notes[0].aliases.length === 1)
        assert.equal(db.data.notes[1].aliases.length, 0)
        assert(db.data.notes[2].aliases.length === 1)

        assert(db.data.notes[0].aliases.includes('2a'))
        assert(db.data.notes[2].aliases.includes('123abc'))
      })
    })

    describe('for nonexistent note', function () {
      it('should be ignored', function () {
        assert.throws(
          () => db.add(new Alias(0, '1a')),
          InvalidAttributeError)
        assert(db.data.notes.length === 0)
        assert(!db.data.aliases['1a'])
      })
    })
  })

  describe('add Sequence', function () {
    describe('with malformed aliases', function () {
      it('should be ignored', function () {
        db.add(new Note(0, 'parent'))
        db.add(new Note(1, 'child'))
        db.add(new Alias(0, '2'))
        db.add(new Alias(0, '2a'))
        db.add(new Sequence('2', '2a'))

        assert.throws(
          () => db.add(new Sequence('2', 'b')),
          InvalidAttributeError)

        assert.throws(
          () => db.add(new Sequence(null, null)),
          InvalidAttributeError)

        assert(!db.data.aliases['b'])
        assert.equal(db.data.aliases['2'].children.length, 1)
        assert(db.data.aliases['2'].children.includes('2a'))
      })
    })

    describe('with null aliases', function () {
      it('should be ignored', function () {
        db.add(new Note(0, 'note'))
        db.add(new Alias(0, '2'))

        assert.throws(
          () => db.add(new Sequence(null, '2')),
          InvalidAttributeError)

        assert(db.data.aliases['2'].parent === null)

        assert.throws(
          () => db.add(new Sequence('', '2')),
          InvalidAttributeError)

        assert(db.data.aliases['2'].parent === null)
      })
    })

    describe('with nonexistent aliases', function () {
      it('should be ignored', function () {
        db.add(new Sequence('0', '0a'))
        assert(db.data.notes.length === 0)
        assert(!db.data.aliases['0'])
        assert(!db.data.aliases['0a'])
      })
    })

    describe('with non-sequential aliases', function () {
      it('should be ignored', function () {
        db.add(new Note(0, 'parent'))
        db.add(new Note(1, 'child'))
        db.add(new Alias(0, '2'))
        db.add(new Alias(1, '2a'))

        assert.throws(
          () => db.add(new Sequence('2a', '2')),
          InvalidAttributeError)

        assert.throws(
          () => db.add(new Sequence('2', '3')),
          InvalidAttributeError)

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
      it('should be ignored', function () {
        db.add(new Note(0, 'src'))
        db.add(new Note(1, 'dest'))

        assert.throws(
          () => db.add(new Link(0, 1, null)),
          InvalidAttributeError)

        assert.throws(
          () => db.add(new Link(0, null, 'oops')),
          InvalidAttributeError)

        assert.throws(
          () => db.add(new Link(null, 1, 'oops')),
          InvalidAttributeError)

        assert(db.data.notes[0].links.length === 0)
        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].links.length === 0)
        assert(db.data.notes[1].backlinks.length === 0)
      })
    })

    describe('between nonexistent notes', function () {
      it('should be ignored', function () {
        db.add(new Note(0, 'note'))

        db.add(new Link(0, 1, 'oops'))
        db.add(new Link(1, 0, 'oops'))

        assert(db.data.notes[0].links.length === 0)
        assert(db.data.notes[0].backlinks.length === 0)
      })
    })

    describe('without annotation', function () {
      it('should not generate backlink', function () {
        db.add(new Note(0, 'src'))
        db.add(new Note(1, 'dest'))
        db.add(new Link(0, 1, ''))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === 1)
        assert(db.data.notes[0].links[0].annotation === '')

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 0)
      })
    })

    describe('with annotation', function () {
      it('should generate backlink', function () {
        db.add(new Note(0, 'src'))
        db.add(new Note(1, 'dest'))
        db.add(new Link(0, 1, 'annotation'))

        assert(db.data.notes[0].links.length === 1)
        assert(db.data.notes[0].links[0].dest === 1)
        assert(db.data.notes[0].links[0].annotation === 'annotation')

        assert(db.data.notes[1].links.length === 0)

        assert(db.data.notes[0].backlinks.length === 0)
        assert(db.data.notes[1].backlinks.length === 1)
        assert(db.data.notes[1].backlinks.includes(0))
      })
    })
  })
})

describe('Query', function () {
  const data = { aliases: {}, notes: {} }
  data.notes[0] = {
    title: 'Note 0',
    aliases: [],
    links: [],
    backlinks: []
  }
  data.notes[1] = {
    title: 'Note 1',
    aliases: [],
    links: [],
    backlinks: []
  }
  data.notes[2] = {
    title: 'Note 2',
    aliases: [],
    links: [],
    backlinks: []
  }
  data.notes[0].links.push({ dest: 1, annotation: '0->1' })
  data.notes[1].links.push({ dest: 2, annotation: '' })
  data.notes[1].backlinks.push({ src: 0, annotation: '0->1' })

  const query = new Query(data)

  describe('note', function () {
    describe('non-integer ID', function () {
      it('should return null', function () {
        assert(query.note('invalid') === null)
      })
    })

    describe('integer ID', function () {
      it('should return note with integer ID', function () {
        const note = query.note('0')
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
    describe('non-integer ID', function () {
      it("shouldn't yield anything", function () {
        const result = Array.from(query.links('invalid'))
        assert(result.length === 0)
      })
    })

    describe('valid note ID', function () {
      it('should return direct links from the note', function () {
        const result = Array.from(query.links('0'))
        assert.strictEqual(result.length, 1)
        assert.strictEqual(result[0].note.id, 1)
        assert.strictEqual(result[0].note.title, 'Note 1')
        assert.strictEqual(result[0].annotation, '0->1')
      })
    })
  })

  describe('backlinks', function () {
    it('should yield annotated links', function () {
      const result = Array.from(query.backlinks(1))
      assert.strictEqual(result.length, 1)
      assert.strictEqual(result[0].note.id, 0)
      assert.strictEqual(result[0].note.title, 'Note 0')
      assert.strictEqual(result[0].annotation, '0->1')
    })

    it("shouldn't yield unannotated links", function () {
      const backlinks = Array.from(query.backlinks(2))
      assert.strictEqual(backlinks.length, 0)

      // even if there are forward links
      const links = Array.from(query.links(1))
      assert.strictEqual(links.length, 1)
      assert.strictEqual(links[0].note.id, 2)
      assert.strictEqual(links[0].note.title, 'Note 2')
      assert.strictEqual(links[0].annotation, '')
    })
  })

  describe('parent', function () {

  })

  describe('children', function () {

  })
})
