const cytoscape = require('cytoscape')
const { fetchJson } = require('./utils.js')

function createCytoscape (container, data, selectCallback) {
  const cy = cytoscape({
    container,
    style: [
      {
        selector: 'node:selected',
        style: {
          'background-color': '#9333ea'
        }
      },
      {
        selector: 'node',
        style: {
          label: 'data(title)',
          'text-wrap': 'wrap',
          'text-max-width': 120
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle'
        }
      }
    ],
    layout: {
      name: 'preset'
    },
    ...data
  })

  /// Update titles
  const template = document.createElement('template')
  cy.nodes().forEach(ele => {
    template.innerHTML = ele.data('title')
    ele.data('title', template.content.textContent)
  })

  if (selectCallback) cy.on('select', 'node', selectCallback)
  return cy
}

function getGraphDataUrl () {
  const hash = window.location.hash.slice(1)
  if (!hash) return 'graph/data.json'
  if (hash.startsWith('tags/')) return `graph/tag/${hash.slice(5)}.json`
  if (Number.isInteger(Number(hash))) return `graph/note/${hash}.json`
  return 'graph/data.json'
}

function connectGraphDialogAndButton (button, dialog) {
  button.addEventListener('click', async () => {
    dialog.show()

    const container = dialog.querySelector('div')
    const cy = createCytoscape(
      container,
      await fetchJson(getGraphDataUrl()),
      event => {
        const { title, id } = event.target.data()
        const span = document.createElement('span')
        span.innerHTML = `${title} [<a href="#${id}">${id}</a>]`
        dialog.label = span

        span.querySelector('a').onclick = () => {
          dialog.hide()
          return window.location.hash.slice(1) !== id
        }
      }
    )

    let id = window.location.hash
    if (id === '' || id === '#' || !Number.isInteger(Number(id.slice(1)))) {
      const roots = cy.nodes().roots()
      const index = Math.floor(Math.random() * roots.length)
      id = `#${roots[index].data('id')}`
    }
    const node = cy.$(id)
    node.select()
    cy.center(node)
    cy.zoom({
      level: 1,
      renderedPosition: node.renderedPosition()
    })
  })
}

module.exports = { connectGraphDialogAndButton }
