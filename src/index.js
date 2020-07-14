import * as Graph from './graph.js'
import * as Search from './search.js'
import * as SeeAlso from './seealso.js'
import * as Toggle from './toggle.js'

Search.init()
SeeAlso.init(slipbox)
Toggle.init()
Graph.init(slipbox)
