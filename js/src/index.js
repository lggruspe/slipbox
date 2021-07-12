const List = require('./list.js')
const Search = require('./search.js')
const { SlipboxCollection } = require('./slipbox.js')
const { fetchJson } = require('./utils.js')

const cytoscape = require('cytoscape')
const graph = require('./graph.js')
const home = require('./home.js')
const shuffle = require('./shuffle.js')

window.slipbox = new SlipboxCollection()

function initSlipbox () {
  fetchJson('graph/data.json')
    .then(json => {
      const cy = cytoscape({ headless: true, ...json })
      for (const node of cy.nodes()) {
        window.slipbox.addNote(node.data('id'))
      }
      for (const edge of cy.edges()) {
        const { source, target, tag } = edge.data()
        window.slipbox.addLink(source, target, tag)
      }
    })
    .then(() => {
      window.slipbox.colorEntrypoints()
      const title = document.getElementById('title-block-header')
      if (title) { title.remove() }
      List.init()
      Search.init()
      graph.init()
      shuffle.init()
    })
}

window.addEventListener('DOMContentLoaded', initSlipbox)
home.init()
