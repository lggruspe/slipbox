const graph = require('./graph.js')
const home = require('./home.js')
const list = require('./list.js')
const search = require('./search.js')
const shuffle = require('./shuffle.js')
const { fetchJson } = require('./utils.js')

function initSlipbox () {
  fetchJson('graph/data.json')
    .then(() => {
      const title = document.getElementById('title-block-header')
      if (title) { title.remove() }
      list.init()
      search.init()
      graph.init()
      shuffle.init()
    })
}

window.addEventListener('DOMContentLoaded', initSlipbox)
home.init()
