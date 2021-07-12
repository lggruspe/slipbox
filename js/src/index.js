const List = require('./list.js')
const Search = require('./search.js')
const { SlipboxCollection } = require('./slipbox.js')
const { fetchJson } = require('./utils.js')

const cytoscape = require('cytoscape')
const { Router } = require('@lggruspe/fragment-router')
const shuffle = require('./shuffle.js')
const graph = require('./graph.js')
const graph2 = require('./graph2.js')

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
      const router = new Router()
      router.mount('', graph.router)

      window.slipbox.colorEntrypoints()
      const title = document.getElementById('title-block-header')
      if (title) { title.remove() }
      List.init()
      Search.init()

      graph.init()
      graph2.init()

      shuffle.init()

      router.listen()
      dispatchEvent(new CustomEvent('fragment-router'))
    })
}

window.addEventListener('DOMContentLoaded', initSlipbox)
