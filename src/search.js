import Fuse from 'fuse.js'

function createFuse () {
  const options = {
    includeMatches: true,
    ignoreLocation: true,
    keys: ['textContent'],
    threshold: 0.45
  }
  const nodes = document.body.querySelectorAll('section.level1')
  const sections = Array.prototype.filter.call(nodes, function (node) {
    return Number.isInteger(Number(node.id))
  })
  return new Fuse(sections, options)
}

function getSearchResults (fuse) {
  const div = document.querySelector('input.search-bar')
  return fuse.search(div.value)
}

function displayResults (results) {
  const div = document.querySelector('div.search-results')
  div.textContent = ''
  for (const result of results) {
    const p = document.createElement('p')
    const h3 = document.createElement('h3')
    h3.innerHTML = `<a href="#${result.item.id}">${result.item.title}</a>`
    p.appendChild(h3)

    let count = 3
    for (const child of result.item.children) {
      const clone = child.cloneNode(true)
      if (count-- <= 0) break
      if (clone.tagName === 'H1' && clone.title === result.item.title) {
        continue
      }
      p.appendChild(clone)
    }

    div.appendChild(p)
    div.appendChild(document.createElement('hr'))
  }
}

function searchNotes (fuse) {
  const results = getSearchResults(fuse)
  displayResults(results)
}

function searchBar () {
  const form = document.createElement('form')
  form.action = 'javascript:void(0)'

  const fuse = createFuse()

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Search notes...'
  input.classList.add('search-bar')
  input.style.width = '100%'
  input.style.background = 'transparent'
  input.style.border = 'none'
  input.style.borderBottomStyle = 'solid'
  input.style.borderWidth = 'thin'

  input.addEventListener('change', function () {
    window.location.hash = '#search'
    searchNotes(fuse)
  })

  form.appendChild(input)
  return form
}

function searchResults () {
  const div = document.createElement('div')
  div.classList.add('search-results')
  return div
}

function searchPage () {
  const page = document.createElement('section')
  page.id = 'search'
  page.title = 'Search'
  page.classList.add('level1')
  page.appendChild(searchResults())
  return page
}

function searchSpan () {
  const span = document.createElement('span')
  span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>'

  const svg = span.querySelector('svg')
  svg.style.height = '1em'
  return span
}

function searchForm () {
  const button = searchSpan()
  const form = searchBar()
  form.style.display = 'none'

  const input = form.querySelector('input')

  button.addEventListener('click', function () {
    button.style.display = 'none'
    form.style.display = ''
    input.focus()
  })

  form.addEventListener('focusout', function () {
    button.style.display = ''
    form.style.display = 'none'
  })

  const div = document.createElement('div')
  div.appendChild(button)
  div.appendChild(form)
  return div
}

function init () {
  document.body.appendChild(searchPage())
  document.body.insertBefore(searchForm(), document.body.firstChild)
}

export { init }
