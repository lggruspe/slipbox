import { Query } from '../src/model.js'

import assert from 'assert'

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
