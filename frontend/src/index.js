const Graph = require('./graph.js')
const List = require('./list.js')
const Search = require('./search.js')
const srs = require('./srs.js')

const { Router } = require('@lggruspe/fragment-router')
const reviewRouter = require('./review.js')
const graphRouter = require('./new.graph.js')
const router = new Router()
router.mount('review/', reviewRouter)
router.mount('graph/', graphRouter)

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

  router.listen()
}
