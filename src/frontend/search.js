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

function displayResults (results, container) {
  // Display results in container.
  const div = container
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

function searchBar (fuse, container) {
  // Container will contain search results.
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
    const results = fuse.search(input.value)
    displayResults(results, container)
  })
  return input
}

function searchResults () {
  const div = document.createElement('div')
  div.classList.add('search-results')
  return div
}

function searchPage (container) {
  // Container will contain search results.
  const page = document.createElement('section')
  page.id = 'search'
  page.title = 'Search'
  page.classList.add('level1')
  page.appendChild(container)
  return page
}

function searchSpan () {
  const span = document.createElement('span')
  span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>'
  span.firstChild.style.height = '1em'
  return span
}

function searchForm (container) {
  // Container will contain search results.
  const button = searchSpan()
  const input = searchBar(createFuse(), container)
  input.style.display = 'none'

  button.addEventListener('click', function () {
    button.style.display = 'none'
    input.style.display = ''
    input.focus()
  })

  input.addEventListener('focusout', function () {
    button.style.display = ''
    input.style.display = 'none'
  })

  const div = document.createElement('div')
  div.appendChild(button)
  div.appendChild(input)
  return div
}

function init () {
  const container = searchResults()
  document.body.appendChild(searchPage(container))
  document.body.insertBefore(searchForm(container), document.body.firstChild)
}

export { init }
