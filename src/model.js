class Query {
  constructor (data) {
    this.data = data || {
      aliases: {},
      notes: {}
    }
  }

  note (id) {
    id = Number(id)
    if (!Number.isInteger(Number(id))) return null
    const note = this.data.notes[id]
    if (!note) return null

    const self = this
    return {
      id: id,
      title: note.title,
      links: () => this.links(id),
      backlinks: () => this.backlinks(id),
      aliases: function * () {
        yield * note.aliases
      },
      parents: function * () {
        for (const alias of note.aliases) {
          const parent = self.parent(alias)
          if (parent) {
            yield parent
          }
        }
      },
      children: function * () {
        for (const alias of note.aliases) {
          yield * self.children(alias)
        }
      }
    }
  }

  * links (id) {
    const src = this.data.notes[id] || { links: [] }
    for (const link of src.links) {
      const dest = this.note(link.dest)
      if (dest) {
        yield { note: dest, annotation: link.annotation }
      }
    }
  }

  * backlinks (id) {
    const dest = this.data.notes[id] || { backlinks: [] }
    for (const backlink of dest.backlinks) {
      const src = this.note(backlink.src)
      if (src) {
        yield { note: src, annotation: backlink.annotation }
      }
    }
  }

  parent (alias) {
    const parentAlias = this.data.aliases[alias].parent
    if (parentAlias) {
      const parentID = this.data.aliases[parentAlias].id
      return { note: this.note(parentID), annotation: parentAlias }
    }
  }

  * children (alias) {
    const children = this.data.aliases[alias].children || []
    for (const childAlias of children) {
      const childID = this.data.aliases[childAlias]
      const child = this.note(childID)
      yield { note: child, annotation: childAlias }
    }
  }
}

export { Query }
