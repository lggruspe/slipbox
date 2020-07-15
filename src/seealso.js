import { getSectionFromHash } from './toggle.js'

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

function * generateBacklinkLis (query, id) {
  const note = query.note(id)
  if (note) {
    for (const backlink of note.backlinks()) {
      yield Li([
        document.createTextNode(`[${backlink.src.id}] `),
        A(backlink.src.title, `#${backlink.src.id}`, backlink.annotation)
      ])
    }
  }
}

function * generateDirectLinkLis (query, id) {
  const note = query.note(id)
  if (note) {
    for (const link of note.links()) {
      const b = document.createElement('b')
      b.appendChild(document.createTextNode(`[${link.dest.id}] `))
      yield Li([b, A(link.dest.title, '#' + link.dest.id, link.annotation)])
    }
  }
}

function * generateParentLis (query, id) {
  const note = query.note(id)
  if (note) {
    for (const parent of note.parents()) {
      yield Li([
        document.createTextNode(`[${parent.note.id}/${parent.alias}] `),
        A(parent.note.title, '#' + parent.note.id)
      ])
    }
  }
}

function * generateChildLis (query, id) {
  const note = query.note(id)
  if (note) {
    for (const child of note.children()) {
      yield Li([
        document.createTextNode(`[${child.note.id}/${child.alias}] `),
        A(child.note.title, '#' + child.note.id)
      ])
    }
  }
}

function createRelatedUl (query, id) {
  const lis = [
    ...generateBacklinkLis(query, id),
    ...generateDirectLinkLis(query, id),
    ...generateParentLis(query, id),
    ...generateChildLis(query, id)
  ]
  lis.sort(compareSeeAlsoItems)
  const ul = document.createElement('ul')
  for (const li of lis) {
    ul.appendChild(li)
  }
  return ul
}

function createSeeAlsoDiv (query, id) {
  const div = document.createElement('div')
  div.id = 'slipbox-see-also'
  const ul = createRelatedUl(query, id)
  if (ul.children.length > 0) {
    const h3 = document.createElement('h3')
    h3.innerText = 'See also'
    div.appendChild(h3)
    div.appendChild(ul)
  }
  return div
}

function createAliasesP (query, id) {
  const p = document.createElement('p')
  p.id = 'slipbox-aliases'

  const note = query.note(id)
  if (!note) return p

  const aliases = Array.from(note.aliases()).map(alias => {
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

function setAliasesP (query, id) {
  const p = document.getElementById('slipbox-aliases')
  if (p) {
    p.remove()
  }
  document.body.appendChild(createAliasesP(query, id))
}

function setSeeAlsoDiv (query, id) {
  const div = document.getElementById('slipbox-see-also')
  if (div) {
    div.remove()
  }
  document.body.appendChild(createSeeAlsoDiv(query, id))
}

function seeAlso (query, hash) {
  const section = getSectionFromHash(hash) // closest level1 ancestor
  const id = section ? Number(section.id) : 0
  setAliasesP(query, id)
  setSeeAlsoDiv(query, id)
}

function init (query) {
  const handler = () => seeAlso(query, window.location.hash)
  window.addEventListener('hashchange', handler)
  handler()
}

export { init }
