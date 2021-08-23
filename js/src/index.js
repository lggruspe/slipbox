import cytoscape from 'cytoscape'

import * as graph from './graph.js'
import * as home from './home.js'
import * as list from './list.js'
import * as search from './search.js'
import * as shuffle from './shuffle.js'

import { fetchJson } from './utils.js'

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
