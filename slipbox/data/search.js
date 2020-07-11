function createFuse () {
  const options = {
    includeMatches: true,
    includeScore: true,
    ignoreLocation: true,
    keys: ['textContent']
  }
  const nodes = document.body.querySelectorAll('section.level1')
  const sections = Array.prototype.filter.call(nodes, function (node) {
    return Number.isInteger(Number(node.id))
  })
  return new Fuse(sections, options)
}

const results = []

function pushSearchResult () {
  const div = document.querySelector('input.search-bar')
  results.push(div.value)
  updateResultsDiv()
}

function updateResultsDiv () {
  const div = document.querySelector('div.search-results')
  div.textContent = ''
  for (const result of results) {
    const p = document.createElement('p')
    p.textContent = result
    div.appendChild(p)
  }
}

function searchNotes () {
  pushSearchResult()
  updateResultsDiv()
}

function createSearchBar () {
  const form = document.createElement('form')
  form.action = 'javascript:void(0)'
  form.style.textAlign = 'center'
  form.innerHTML = `
    <input type="text" placeholder="Search notes..." class="search-bar"
      onchange="searchNotes()" size="50">
  `
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
  page.appendChild(createSearchResults())
  return page
}

window.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(createSearchPage())
})
