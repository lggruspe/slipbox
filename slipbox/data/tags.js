function createTagListSection() {
  let section = document.createElement("section")
  section.id = "tags"
  section.title = "Tags"
  section.classList.add("level1")
  let h1 = document.createElement("h1")
  h1.innerText = "Tags"
  section.appendChild(h1)
  let ul = document.createElement("ul")
  section.appendChild(ul)
  for (let tag of Object.keys(slipbox.tags).sort()) {
    ul.appendChild(Li([
      A(tag, "#"+tag)
    ]))
  }
  return section
}

function createTagSection(tag) {
  let section = document.createElement("section")
  section.id = tag
  section.title = tag
  section.classList.add("level1")
  let h1 = document.createElement("h1")
  section.appendChild(h1)
  let ul = document.createElement("ul")
  section.appendChild(ul)
  h1.appendChild(A(tag, "#tags", "List of tags"))
  for (let id of slipbox.tags[tag]) {
    let li = document.createElement("li")
    ul.appendChild(li)
    let a = document.createElement("a")
    li.appendChild(document.createTextNode("["+id+"] "))
    li.appendChild(a)
    a.href = '#' + id
    a.innerText = slipbox.notes[id].title
  }
  return section
}
window.addEventListener("load", function() {
  for (let tag of Object.keys(slipbox.tags)) {
    let section = createTagSection(tag)
    document.body.appendChild(section)
  }
  document.body.appendChild(createTagListSection())
})
