function hideSections() {
  let sections = document.getElementsByTagName("section")
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    if (section.classList.contains("level1")) {
      if (Number.isInteger(Number(section.id))) {
        section.style.display = "none"
      } else if (section.id.charAt(0) == '#') {
        section.style.display = "none"
      } else if (section.id == "references") {
        section.style.display = "none"
      } else if (section.id == "tags") {
        section.style.display = "none"
      }
    }
  }
}

function getSectionFromHash(hash) {
  let id = hash.substring(1)
  if (!id) { return null }
  let elem = document.getElementById(id)
  if (elem) {
    return elem.closest("section.level1")
  }
}

let _previousHash = window.location.hash
function changeSection() {
  let oldSection = getSectionFromHash(_previousHash)
  if (oldSection) {
    oldSection.style.display = "none"
  }
  _previousHash = window.location.hash
  let newSection = getSectionFromHash(_previousHash)
  if (newSection) {
    newSection.style.display = ""
  } else {
    window.location.hash = "#0"
  }
}

window.addEventListener("load", hideSections)
window.addEventListener("load", changeSection)
window.addEventListener("hashchange", changeSection)
