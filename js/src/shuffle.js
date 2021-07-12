const cytoscape = require('cytoscape')
const { fetchJson } = require('./utils.js')

function randomChoice (choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

/// Return note ID of random outgoer or root.
async function shuffle () {
  const cy = cytoscape({ headless: true, ...await fetchJson('graph/data.json') })

  const id = window.location.hash.slice(1)
  if (id && Number.isInteger(Number(id))) {
    const outgoers = cy.$(`#${id}`).outgoers().nodes()
    if (outgoers.length > 0) {
      return randomChoice(outgoers).data('id')
    }
  }
  return randomChoice(cy.nodes().roots()).data('id')
}

/// Register shuffle button callbacks.
function init () {
  const button = document.querySelector('sl-icon-button[name="bx-shuffle"]')
  button.addEventListener('click', async () => {
    window.location.hash = `#${await shuffle()}`
  })
}

module.exports = { init }
