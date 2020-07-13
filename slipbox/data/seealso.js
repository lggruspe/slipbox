function A (innerText, href, title) {
  const a = document.createElement('a')
  a.innerText = innerText
  a.href = href
  if (title != null) {
    a.title = title
  }
  return a
}

function Li (children) {
  const li = document.createElement('li')
  for (const child of children) {
    li.appendChild(child)
  }
  return li
}

function aliasOwner (alias) {
  const found = alias.match(/^\d+/)
  return found ? found[0] : ''
}

function compareSeeAlsoItems (a, b) {
  const atext = a.innerText
  const btext = b.innerText
  return atext < btext ? -1 : atext === btext ? 0 : 1
}

function * generateBacklinkLis (slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof (id) === 'number')
  const notes = slipbox.notes
  const note = notes[id] || { backlinks: [] }
  for (const link of note.backlinks) {
    console.assert(typeof (link.src) === 'number')
    console.assert(notes[link.src])
    console.assert(typeof (notes[link.src].title) === 'string')
    console.assert(notes[link.src].title)
    yield Li([
      document.createTextNode('[' + link.src + '] '),
      A(notes[link.src].title, '#' + link.src, link.annotation)
    ])
  }
}

function * generateDirectLinkLis (slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof (id) === 'number')
  const notes = slipbox.notes
  const note = notes[id] || { backlinks: [] }
  for (const link of note.links) {
    console.assert(typeof (link.dest) === 'number')
    console.assert(notes[link.dest])
    console.assert(typeof (notes[link.dest].title) === 'string')
    console.assert(notes[link.dest].title)
    const b = document.createElement('b')
    b.appendChild(document.createTextNode(`[${link.dest}] `))
    yield Li([ b, A(notes[link.dest].title, '#' + link.dest, link.annotation)])
  }
}

function * generateParentLis (slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof (id) === 'number')
  const notes = slipbox.notes
  const note = notes[id] || { aliases: [] }
  for (const alias of note.aliases) {
    console.assert(slipbox.aliases[alias])
    const parentAlias = slipbox.aliases[alias].parent
    if (parentAlias) {
      const parentId = slipbox.aliases[parentAlias].id
      console.assert(typeof (parentId) === 'number')
      yield Li([
        document.createTextNode(`[${parentId}/${parentAlias}] `),
        A(slipbox.notes[parentId].title, '#' + parentId)
      ])
    }
  }
}

function * generateChildLis (slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof (id) === 'number')
  const notes = slipbox.notes
  const note = notes[id] || { aliases: [] }
  for (const alias of note.aliases) {
    console.assert(slipbox.aliases[alias])
    for (const child of slipbox.aliases[alias].children) {
      const childId = slipbox.aliases[child].id
      yield Li([
        document.createTextNode(`[${childId}/${child}] `),
        A(slipbox.notes[childId].title, '#' + childId)
      ])
    }
  }
}

function createRelatedUl (slipbox, id) {
  const lis = Array.from(generateBacklinkLis(slipbox, id))
  for (const li of generateDirectLinkLis(slipbox, id)) {
    lis.push(li)
  }
  for (const li of generateParentLis(slipbox, id)) {
    lis.push(li)
  }
  for (const li of generateChildLis(slipbox, id)) {
    lis.push(li)
  }
  lis.sort(compareSeeAlsoItems)
  const ul = document.createElement('ul')
  for (const li of lis) {
    ul.appendChild(li)
  }
  return ul
}

function createSeeAlsoDiv (slipbox, id) {
  const div = document.createElement('div')
  div.id = 'slipbox-see-also'
  const ul = createRelatedUl(slipbox, id)
  if (ul.children.length > 0) {
    const h3 = document.createElement('h3')
    h3.innerText = 'See also'
    div.appendChild(h3)
    div.appendChild(ul)
  }
  return div
}

function createAliasesP (slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof (id) === 'number')
  const note = slipbox.notes[id] || { aliases: [] }
  const p = document.createElement('p')
  p.id = 'slipbox-aliases'
  const aliases = note.aliases.map(alias => {
    const span = document.createElement('span')
    span.appendChild(document.createTextNode(' ['))
    span.appendChild(A(alias, '#' + aliasOwner(alias)))
    span.appendChild(document.createTextNode(']'))
    return span
  })
  if (aliases.length > 0) {
    const text = document.createElement('strong')
    text.innerText = 'Aliases:'
    p.appendChild(text)
    aliases.forEach(alias => p.appendChild(alias))
  }
  return p
}

function setAliasesP (slipbox, id) {
  const p = document.getElementById('slipbox-aliases')
  if (p) {
    p.remove()
  }
  document.body.appendChild(createAliasesP(slipbox, id))
}

function setSeeAlsoDiv (slipbox, id) {
  const div = document.getElementById('slipbox-see-also')
  if (div) {
    div.remove()
  }
  document.body.appendChild(createSeeAlsoDiv(slipbox, id))
}

function seeAlso (slipbox, hash) {
  const section = getSectionFromHash(hash) // closest level1 ancestor
  const id = section ? Number(section.id) : 0
  setAliasesP(slipbox, id)
  setSeeAlsoDiv(slipbox, id)
}

window.addEventListener('hashchange', function () {
  seeAlso(slipbox, window.location.hash)
})

window.addEventListener('DOMContentLoaded', function () {
  seeAlso(slipbox, window.location.hash)
})
