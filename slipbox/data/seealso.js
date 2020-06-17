function A(innerText, href, title) {
  let a = document.createElement("a")
  a.innerText = innerText
  a.href = href
  a.title = title
  return a
}

function Li(children) {
  let li = document.createElement("li")
  for (let child of children) {
    li.appendChild(child)
  }
  return li
}

function* generateBacklinkLis(slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof(id) === "number")
  let notes = slipbox.notes
  let note = notes[id] || {backlinks: []}
  for (let link of note.backlinks) {
    console.assert(typeof(link.src) === "number")
    console.assert(notes[link.src])
    console.assert(typeof(notes[link.src].title) === "string")
    console.assert(notes[link.src].title)
    yield Li([
      document.createTextNode("[" + link.src + "] "),
      A(notes[link.src].title, "#" + link.src, link.annotation)
      ])
  }
}

function* generateParentLis(slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof(id) === "number")
  let notes = slipbox.notes
  let note = notes[id] || {aliases: []}
  for (let alias of note.aliases) {
    console.assert(slipbox.aliases[alias])
    let parentAlias = slipbox.aliases[alias].parent
    if (parentAlias) {
      let parentId = slipbox.aliases[parentAlias].id
      console.assert(typeof(parentId) === "number")
      yield Li([
        document.createTextNode("[" + parentAlias + "] "),
        A(slipbox.notes[parentId].title, "#" + parentId)
        ])
    }
  }
}

function* generateChildLis(slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof(id) === "number")
  let notes = slipbox.notes
  let note = notes[id] || {aliases: []}
  for (let alias of note.aliases) {
    console.assert(slipbox.aliases[alias])
    for (let child of slipbox.aliases[alias].children) {
      let childId = slipbox.aliases[child].id
      yield Li([
        document.createTextNode("[" + child + "] "),
        A(slipbox.notes[childId].title, "#" + childId)
        ])
    }
  }
}

function createRelatedUl(slipbox, id) {
  let ul = document.createElement("ul")
  for (let li of generateBacklinkLis(slipbox, id)) {
    ul.appendChild(li)
  }
  for (let li of generateParentLis(slipbox, id)) {
    ul.appendChild(li)
  }
  for (let li of generateChildLis(slipbox, id)) {
    ul.appendChild(li)
  }
  return ul
}

function createSeeAlsoDiv(slipbox, id) {
  let div = document.createElement("div")
  div.id = "slipbox-see-also"
  let ul = createRelatedUl(slipbox, id)
  if (ul.children.length > 0) {
    let h3 = document.createElement("h3")
    h3.innerText = "See also"
    div.appendChild(h3)
    div.appendChild(ul)
  }
  return div
}

function createAliasesP(slipbox, id) {
  console.assert(slipbox)
  console.assert(slipbox.notes)
  console.assert(typeof(id) == "number")
  let note = slipbox.notes[id] || {aliases: []}
  let p = document.createElement("p")
  p.id = "slipbox-aliases"
  let aliases = note.aliases.map(alias => document.createTextNode(" ["+alias+"]"))
  if (aliases.length > 0) {
    let text = document.createElement("strong")
    text.innerText = "Aliases:"
    p.appendChild(text)
    aliases.forEach(alias => p.appendChild(alias))
  }
  return p
}

function setAliasesP(slipbox, id) {
  let p = document.getElementById("slipbox-aliases")
  if (p) {
    p.remove()
  }
  document.body.appendChild(createAliasesP(slipbox, id))
}

function setSeeAlsoDiv(slipbox, id) {
  let div = document.getElementById("slipbox-see-also")
  if (div) {
    div.remove()
  }
  document.body.appendChild(createSeeAlsoDiv(slipbox, id))
}

function seeAlso(slipbox, hash) {
  let section = getSectionFromHash(hash)  // closest level1 ancestor
  let id = section ? Number(section.id) : 0
  setAliasesP(slipbox, id)
  setSeeAlsoDiv(slipbox, id)
}

window.addEventListener("hashchange", function() {
  seeAlso(slipbox, window.location.hash)
})

window.addEventListener("load", function() {
  seeAlso(slipbox, window.location.hash)
})
