function getSectionFromHash (hash) {
  const id = hash.substring(1)
  if (!id) { return null }
  const elem = document.getElementById(id)
  if (elem) {
    return elem.closest('section.level1')
  }
}

function sectionChanger () {
  let _previousHash = window.location.hash
  return function () {
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
}

function notFoundSection () {
  const section = document.createElement('section')
  section.id = '0'
  section.classList.add('level1')
  section.style.display = 'none'
  const h1 = document.createElement('h1')
  h1.innerText = 'Note not found'
  section.appendChild(h1)
  return section
}

function init () {
  document.body.appendChild(notFoundSection())
  const changeSection = sectionChanger()
  changeSection()
  window.addEventListener('hashchange', changeSection)
}

export { init, getSectionFromHash }
