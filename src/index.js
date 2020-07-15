import * as Graph from './graph.js'
import * as Model from './model.js'
import * as Search from './search.js'
import * as SeeAlso from './seealso.js'
import * as Toggle from './toggle.js'

window.query = new Model.Query(new Model.Database())

window.Model = Model

window.initSlipbox = function () {
  Search.init()
  SeeAlso.init(window.query)
  Toggle.init()
  Graph.init(window.query)
}
