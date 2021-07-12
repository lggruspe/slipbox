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

  if (selectCallback) cy.on('select', 'node', selectCallback)
  return cy
}

async function connectGraphDialogAndButton (button, dialog) {
  button.addEventListener('click', async () => {
    dialog.show()

    const container = dialog.querySelector('div')
    const cy = await createCytoscape(
      container,
      await fetchJson('graph/data.json'),
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

    const id = window.location.hash
    const node = cy.$(id)
    node.select()
    cy.center(node)
    cy.zoom({
      level: 1,
      renderedPosition: node.renderedPosition()
    })
  })
}

function init () {
  connectGraphDialogAndButton(
    document.querySelector('sl-icon-button[name="bx-network-chart"]'),
    document.querySelector('#slipbox-graph-dialog')
  )
}

module.exports = { init }
