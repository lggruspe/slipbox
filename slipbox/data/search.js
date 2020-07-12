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

function createSearchBar () {
  const form = document.createElement('form')
  form.action = 'javascript:void(0)'
  form.style.textAlign = 'center'

  const fuse = createFuse()

  const input = document.createElement('input')
  input.type = 'text'
  input.placeholder = 'Search notes...'
  input.classList.add('search-bar')
  input.style.width = '80%'
  input.addEventListener('change', () => searchNotes(fuse))

  form.appendChild(input)
  return form
}

function createSearchResults () {
  const div = document.createElement('div')
  div.classList.add('search-results')
  return div
}

function createSearchPage () {
  const page = document.createElement('section')
  page.id = 'search'
  page.title = 'Search'
  page.classList.add('level1')
  page.appendChild(createSearchBar())
  page.appendChild(document.createElement('br'))
  page.appendChild(createSearchResults())
  return page
}

function createSearchButton () {
  const a = document.createElement('a')
  a.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>`
  a.href = '#search'
  a.title = 'Search notes'
  return a
}

window.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(createSearchPage())
  document.body.insertBefore(createSearchButton(), document.body.firstChild)
})
