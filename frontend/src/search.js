const Fuse = require('fuse.js')

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
        const heading = result.item.querySelector('h1')
        if (!heading) continue
        const title = heading.textContent

        const h3 = document.createElement('h3')
        h3.innerHTML = `<a href="#${result.item.id}">${title}</a>`
        const p = document.createElement('p')
        p.appendChild(h3)

        let count = 3
        for (const child of result.item.children) {
          const clone = child.cloneNode(true)
          if (count-- <= 0) break
          if (clone.tagName === 'H1' && clone.textContent === title) {
            continue
          }
          p.appendChild(clone)
        }
        container.results.appendChild(p)
        container.results.appendChild(document.createElement('hr'))
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
