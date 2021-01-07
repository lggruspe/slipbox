import * as Graph from './graph.js'
import * as List from './list.js'
import * as Random from './random.js'
import * as Search from './search.js'

window.slipbox = new Graph.SlipboxCollection()

window.initSlipbox = function () {
  const title = document.getElementById('title-block-header')
  if (title) { title.remove() }
  List.init()
  Random.init(window.slipbox)
  Search.init()
  Graph.init(window.slipbox)
}
