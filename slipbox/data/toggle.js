function hideSections () {
  const sections = document.getElementsByTagName('section')
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    if (section.classList.contains('level1')) {
      if (Number.isInteger(Number(section.id))) {
        section.style.display = 'none'
      } else if (section.id.charAt(0) === '#') {
        section.style.display = 'none'
      } else if (section.id === 'references') {
        section.style.display = 'none'
      } else if (section.id.slice(0, 4) === 'ref-') {
        section.style.display = 'none'
      } else if (section.id === 'search') {
        section.style.display = 'none'
      } else if (section.id === 'tags') {
        section.style.display = 'none'
      }
    }
  }
}

function getSectionFromHash (hash) {
  const id = hash.substring(1)
  if (!id) { return null }
  const elem = document.getElementById(id)
  if (elem) {
    return elem.closest('section.level1')
  }
}

let _previousHash = window.location.hash
function changeSection () {
  const oldSection = getSectionFromHash(_previousHash)
  if (oldSection) {
    oldSection.style.display = 'none'
  }
  _previousHash = window.location.hash
  const newSection = getSectionFromHash(_previousHash)
  if (newSection) {
    newSection.style.display = ''
    document.title = newSection.title || 'Slipbox'
  } else {
    window.location.hash = '#0'
  }
  window.scrollTo(0, 0)
}

function addNotFoundSection () {
  const section = document.createElement('section')
  section.id = '0'
  section.classList.add('level1')
  const h1 = document.createElement('h1')
  h1.innerText = 'Note not found'
  section.appendChild(h1)
  document.body.appendChild(section)
}

window.addEventListener('DOMContentLoaded', addNotFoundSection)
window.addEventListener('DOMContentLoaded', hideSections)
window.addEventListener('DOMContentLoaded', changeSection)
window.addEventListener('hashchange', changeSection)
