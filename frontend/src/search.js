const Fuse = require('fuse.js')

function extractTitle (section) {
  // Or create clone of h1?
  const title = section.querySelector('h1')?.textContent
  const h3 = document.createElement('h3')
  h3.innerHTML = `<a href="#${section.id}">${title}</a>`
  return title ? h3 : null
}

function extractSummary (section) {
  const title = extractTitle(section)
  if (!title) return null

  const fragment = document.createDocumentFragment()
  fragment.appendChild(title)

  const _title = title.textContent
  let count = 3
  for (const child of section.children) {
    if (count-- <= 0) break
    const clone = child.cloneNode(true)
    if (clone.tagName === 'H1' && clone.textContent === _title) {
      continue
    }
    fragment.appendChild(clone)
  }
  return fragment
}

function createResultFromSection (section) {
  const summary = extractSummary(section)
  if (!summary) return null

  const div = document.createElement('div')
  div.classList.add('search-result')
  div.appendChild(summary)
  return div
}

class Search {
  constructor (sections, options = null) {
    this.fuse = new Fuse(sections, options || {
      includeMatches: true,
      ignoreLocation: true,
      keys: ['textContent'],
      threshold: 0.45
    })
  }

  render (container) {
    container.input.addEventListener('change', () => {
      window.location.hash = '#search'
      const results = this.fuse.search(container.input.value)
      container.results.textContent = ''
      for (const result of results) {
        const element = createResultFromSection(result.item)
        if (element) container.results.appendChild(element)
        container.results.appendChild(document.createElement('hr'))
        // TODO style .search-result border instead of adding hr
      }
    })
  }
}

module.exports.init = function init () {
  const sections = Array.from(document.getElementsByClassName('slipbox-note'))
  new Search(sections).render({
    results: document.querySelector('#search > .search-results'),
    input: document.querySelector('nav input[type="text"]')
  })
}
