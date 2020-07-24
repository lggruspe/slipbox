function hideSections () {
  const sections = document.getElementsByTagName('section')
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    if (section.classList.contains('level1')) {
      switch (true) {
        case Number.isInteger(Number(section.id)):
        case section.id.charAt(0) === '#':
        case section.id === 'references':
        case section.id.slice(0, 4) === 'ref-':
        case section.id === 'search':
        case section.id === 'tags':
        case section.id === 'entrypoints':
          section.style.display = 'none'
          break
        default:
          break
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
  const h1 = document.createElement('h1')
  h1.innerText = 'Note not found'
  section.appendChild(h1)
  return section
}

function init () {
  document.body.appendChild(notFoundSection())
  hideSections()

  const changeSection = sectionChanger()
  changeSection()
  window.addEventListener('hashchange', changeSection)
}

export { init, getSectionFromHash }
