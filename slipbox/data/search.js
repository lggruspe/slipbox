function createFuse () {
  const options = {
    includeMatches: true,
    ignoreLocation: true,
    keys: ['textContent'],
    threshold: 0.4
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
    const a = document.createElement('a')
    a.href = `#${result.item.id}`
    a.textContent = result.item.title
    p.appendChild(a)
    div.appendChild(p)
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
  input.size = '50'
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

window.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(createSearchPage())
})
