import lunr from 'lunr'

/// Takes callback that gets invoked when title gets clicked.
function extractTitle (section, callback) {
  const title = section?.querySelector('h1')?.textContent
  const h3 = document.createElement('h3')
  const a = document.createElement('a')
  h3.appendChild(a)

  a.href = `#${section.id}`
  a.textContent = title
  if (callback) a.onclick = callback
  return title ? h3 : null
}

function extractSummary (section, callback) {
  const title = extractTitle(section, callback)
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

function createResultFromSection (section, callback) {
  const summary = extractSummary(section, callback)
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
        const element = createResultFromSection(
          document.getElementById(result.ref),
          () => dialog.hide()
        )
        if (element) resultsContainer.appendChild(element)
        resultsContainer.appendChild(document.createElement('br'))
      }
    } catch (e) {
      // ignore uncaught error when typing ~
    }
  })

  dialog.addEventListener('sl-initial-focus', event => {
    event.preventDefault()
    input.focus({ preventScroll: true })
  })
}

export { init }
