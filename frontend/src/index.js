import * as Graph from './graph.js'
import * as List from './list.js'
import * as Search from './search.js'
import * as SRS from './srs.js'

window.slipbox = new Graph.SlipboxCollection()

window.initSlipbox = function () {
  const title = document.getElementById('title-block-header')
  if (title) { title.remove() }
  List.init()
  Search.init()
  SRS.init(window.slipbox)
  Graph.init(window.slipbox)
}
