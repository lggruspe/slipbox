const Graph = require('./graph.js')
const List = require('./list.js')
const Search = require('./search.js')
const srs = require('./srs.js')

window.slipbox = new Graph.SlipboxCollection()

function initSRS (slipbox) {
  const container = document.createElement('div')
  document.querySelector('.slipbox-bottom').appendChild(container)
  new srs.Flashcard(container).render()
  new srs.Scheduler(
    document.querySelector('nav a[href="#random"]'),
    slipbox.cy.nodes().map(e => e.data('id'))
  ).render()
}

window.initSlipbox = function () {
  const title = document.getElementById('title-block-header')
  if (title) { title.remove() }
  List.init()
  Search.init()
  initSRS(window.slipbox)
  Graph.init(window.slipbox)
}
