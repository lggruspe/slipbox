const lunr = require('lunr')

function extractTitle (section) {
  // Or create clone of h1?
  const title = section?.querySelector('h1')?.textContent
  const h3 = document.createElement('h3')
  h3.innerHTML = `<a href="#${section.id}">${title}</a>`
  return title ? h3 : null
}

function extractSummary (section) {
  const title = extractTitle(section)
  if (!title) return null

  const fragment = document.createDocumentFragment()
  fragment.appendChild(title)

  const p = section.querySelector('p')
  if (p) {
    const textCopy = document.createElement('p')
    textCopy.textContent = p.textContent
    fragment.appendChild(textCopy)
  }
  return fragment
}

function createResultFromSection (section) {
  const summary = extractSummary(section)
  if (!summary) return null

  const div = document.createElement('div')
  div.appendChild(summary)
  return div
}

function createSearchIndex (sections) {
  return lunr(function () {
    this.ref('id')
    this.field('textContent')
    sections.forEach(function (sec) {
      this.add(sec)
    }, this)
  })
}

function init () {
  const sections = Array.from(document.getElementsByClassName('slipbox-note'))
  const index = createSearchIndex(sections)

  const dialog = document.querySelector('#slipbox-search-dialog')
  const input = dialog.querySelector('sl-input')
  const resultsContainer = dialog.querySelector('.slipbox-search-dialog-results')

  input.addEventListener('sl-input', () => {
    try {
      const results = input.value === '' ? [] : index.search(input.value)
      resultsContainer.textContent = ''
      for (const result of results) {
        const element = createResultFromSection(document.getElementById(result.ref))
        if (element) resultsContainer.appendChild(element)
        resultsContainer.appendChild(document.createElement('br'))
      }
    } catch (e) {
      // ignore uncaught error when typing ~
    }
  })
}

module.exports = { init }
