import * as Graph from './graph.js'
import * as List from './list.js'
import * as Search from './search.js'

window.slipbox = new Graph.SlipboxCollection()

window.initSlipbox = function () {
  const title = document.getElementById('title-block-header')
  if (title) { title.remove() }
  List.init()
  Search.init()
  Graph.init(window.slipbox)
}
