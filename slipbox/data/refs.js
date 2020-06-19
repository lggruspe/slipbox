function createBibliographySection() {
  let section = document.createElement("section")
  section.id = "references"
  section.title = "References"
  section.classList.add("level1")
  let h1 = document.createElement("h1")
  h1.innerText = "References"
  section.appendChild(h1)
  let ul = document.createElement("ul")
  section.appendChild(ul)
  for (let ref of Object.keys(slipbox.bibliography).sort()) {
    ul.appendChild(Li([
      A("[@"+ref.slice(4)+"]", "#"+ref),
      document.createTextNode(" "+slipbox.bibliography[ref].text)
    ]))
  }
  return section
}

function createCitationSection(ref) {
  let section = document.createElement("section")
  section.id = ref
  section.title = ref
  section.classList.add("level1")
  let h1 = document.createElement("h1")
  section.appendChild(h1)
  let ul = document.createElement("ul")
  section.appendChild(ul)
  h1.appendChild(A(slipbox.bibliography[ref].text, "#references", "Bibliography"))
  for (let id of slipbox.bibliography[ref].citations) {
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
  for (let ref of Object.keys(slipbox.bibliography)) {
    let section = createCitationSection(ref)
    document.body.appendChild(section)
  }
  document.body.appendChild(createBibliographySection())
})
