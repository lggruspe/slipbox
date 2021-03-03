class List {
  constructor (data) {
    this.data = data
    this.prev = this
    this.next = this
  }

  static from (array) {
    if (array.length === 0) {
      return null
    }
    return array.slice(1).reduce(
      (acc, cur) => acc.append(new List(cur)),
      new List(array[0])
    )
  }

  append (other) {
    const last = other.prev
    other.prev = this.prev
    other.prev.next = other
    this.prev = last
    this.prev.next = this
    return this
  }

  remove () {
    if (this.next === this) {
      return this
    }
    const next = this.next
    this.next.prev = this.prev
    this.prev.next = this.next
    this.prev = this
    this.next = this
    return next
  }

  * [Symbol.iterator] () {
    yield this.data
    let current = this.next
    while (current !== this) {
      yield current.data
      current = current.next
    }
  }
}

exports.List = List
