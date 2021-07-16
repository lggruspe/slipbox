const cytoscape = require('cytoscape')
const graph = require('./graph.js')
const home = require('./home.js')
const list = require('./list.js')
const search = require('./search.js')
const shuffle = require('./shuffle.js')
const { fetchJson } = require('./utils.js')

window.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchJson('graph/data.json')

  const title = document.getElementById('title-block-header')
  if (title) title.remove()
  list.init()
  search.init()
  graph.connectGraphDialogAndButton(
    document.querySelector('sl-icon-button[name="bx-network-chart"]'),
    document.querySelector('#slipbox-graph-dialog')
  )
  shuffle.registerShuffleButton(
    cytoscape({ headless: true, ...data }),
    document.querySelector('sl-icon-button[name="bx-shuffle"]')
  )
})

home.init()
