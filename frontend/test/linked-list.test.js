const { List } = require('../src/linked-list.js')
const assert = require('assert')

describe('List', () => {
  describe('constructor', () => {
    it('should store data', () => {
      const data = { foo: 'foo', bar: 'bar' }
      assert.deepStrictEqual(new List(data).data, data)
    })

    it('should create circular list', () => {
      const node = new List()
      assert.strictEqual(node.prev, node)
      assert.strictEqual(node.next, node)
    })
  })

  describe('from', () => {
    describe('with empty array', () => {
      it('should return null', () => {
        assert.strictEqual(List.from([]), null)
      })
    })

    describe('with non-empty array', () => {
      it('should construct List from array', () => {
        const array = [1, 2, 3, 4, 5]
        const list = List.from(array)
        assert.deepStrictEqual(array, Array.from(list))
        assert.strictEqual(list.data, 1)
        assert.strictEqual(list.next.data, 2)
        assert.strictEqual(list.prev.data, 5)
      })
    })
  })

  describe('append', () => {
    describe('singletons', () => {
      it('should return a list with two elements', () => {
        const foo = new List('foo')
        const bar = new List('bar')
        foo.append(bar)
        assert.strictEqual(foo.next, bar)
        assert.strictEqual(foo.prev, bar)
        assert.strictEqual(bar.next, foo)
        assert.strictEqual(bar.prev, foo)
      })
    })

    describe('two long lists', () => {
      it('should concatenate the two lists', () => {
        const first = List.from([0, 1])
        const second = List.from([2, 3])
        first.append(second)
        assert.deepStrictEqual(Array.from(first), [0, 1, 2, 3])

        const one = first.next
        const two = first.next.next
        assert.strictEqual(one.data, 1)
        assert.strictEqual(two.data, 2)
        assert.strictEqual(one.next, two)
        assert.strictEqual(two.prev, one)
      })
    })

    it('should be chainable', () => {
      const list = new List(1).append(new List(2).append(new List(3)))
        .append(new List(4))
      assert.deepStrictEqual(Array.from(list), [1, 2, 3, 4])
    })
  })

  describe('remove', () => {
    describe('singleton list', () => {
      it('should just return itself', () => {
        const list = new List()
        const result = list.remove()
        assert.strictEqual(list, result)
        assert.strictEqual(list.next, list)
        assert.strictEqual(list.prev, list)
      })
    })

    describe('if list has more than one element', () => {
      it('should return the next element in the list and update pointers', () => {
        const list = List.from([1, 2, 3, 4])
        const result = list.remove()
        assert.deepStrictEqual(Array.from(list), [1])
        assert.deepStrictEqual(Array.from(result), [2, 3, 4])
        assert.strictEqual(result.prev.data, 4)
        assert.strictEqual(result.next.data, 3)
      })
    })
  })
})
