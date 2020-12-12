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

function init () {
  // Container will contain search results.
  const container = document.querySelector('#search > .search-results')
  const input = document.querySelector('nav input[type="text"]')
  input.addEventListener('change', function () {
    window.location.hash = '#search'
    const results = createFuse().search(input.value)
    displayResults(results, container)
  })
}

export { init }
