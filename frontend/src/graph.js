const cytoscape = require('cytoscape')

/// Used as a master database that contains information about all notes.
/// The elements in SlipboxCollection.cy aren't displayed directly on the page.
/// Instead, a new cytoscape object gets created whenever a note page or a tag
/// page gets visited (for example).
/// This cytoscape object is a subset of the SlipboxCollection.cy that only
/// contains relevant elements in the visited page.
module.exports.SlipboxCollection = class SlipboxCollection {
  constructor () {
    this.cy = cytoscape({ headless: true })
  }

  addNote (id) {
    const section = document.getElementById(id)
    const title = section.querySelector('h1').textContent
    const filename = section.getAttribute('data-filename')
    this.cy.add({
      data: {
        id,
        title,
        filename,
        label: title,
        bgColor: 'gray'
      }
    })
  }

  addLink (source, target, tag) {
    const id = `${source}-${target}${tag}`
    this.cy.add({ data: { id, source, target, tag } })
  }

  colorEntrypoints () {
    // Call this after inserting all notes and links.
    this.cy.nodes(e => e.indegree(false) === 0 && e.outdegree(false) > 0).data('bgColor', '#4444aa')
  }
}

function graphArea () {
  const div = document.createElement('div')
  div.innerHTML = `
    <div class="slipbox-graph-cytoscape"></div>
    <div class="slipbox-graph-info">
      <header>
        <h3><a href=""></a></h3>
        <p></p>
      </header>
    </div>
  `
  return div
}

function clusterElements (slipbox, tag) {
  const edges = slipbox.cy.edges(`[tag="${tag}"]`)
  const nodes = edges.connectedNodes()
  return nodes.union(edges.filter(e => e.data('source') !== e.data('target')))
}

function neighborElements (slipbox, id) {
  const node = slipbox.cy.getElementById(id)

  const incomingEdges = new Set()
  const incomers = node.incomers().edges('edge[tag]')
  while (incomers.length > 0) {
    const edge = incomers.pop()
    const tag = edge.data('tag')
    if (incomingEdges.has(edge)) {
      continue
    }
    incomers.push(...edge.source().incomers(`edge[tag="${tag}"]`))
    incomingEdges.add(edge)
  }

  const outgoingEdges = new Set()
  const outgoers = node.outgoers().edges('edge[tag]')
  while (outgoers.length > 0) {
    const edge = outgoers.pop()
    const tag = edge.data('tag')
    if (outgoingEdges.has(edge)) {
      continue
    }
    outgoers.push(...edge.target().outgoers(`edge[tag="${tag}"]`))
    outgoingEdges.add(edge)
  }

  const edges = slipbox.cy.collection().union(Array.from(incomingEdges)).union(Array.from(outgoingEdges))
  const nodes = edges.connectedNodes()
  const neighbors = node.openNeighborhood()
  const eles = nodes.union(edges).union(neighbors)
    .filter(e => e.isNode() || e.data('source') !== e.data('target'))

  const clone = eles.getElementById(id).clone()
  clone.data('bgColor', 'black')
  return clone.union(eles)
}

class GraphView {
  constructor (container) {
    this.init(container)
  }

  init (container) {
    this.container = container
    this.cy = cytoscape({
      container: this.container.querySelector('.slipbox-graph-cytoscape'),
      selectionType: 'additive',
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(label)',
            height: 'label',
            width: 'label',
            padding: '8px',
            shape: 'round-rectangle',
            color: 'white',
            'background-color': 'data(bgColor)',
            'text-halign': 'center',
            'text-valign': 'center',
            'text-wrap': 'wrap',
            'text-max-width': 100
          }
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'curve-style': 'bezier',
            'line-color': 'black',
            'line-style': 'solid',
            'target-arrow-color': 'black',
            'target-arrow-shape': 'triangle'
          }
        }
      ]
    })
    this.addEventListeners()
  }

  addEventListeners () {
    const a = this.container.querySelector('.slipbox-graph-info header a')
    const p = this.container.querySelector('.slipbox-graph-info header p')
    this.cy.on('select', 'node', event => {
      const id = event.target.data('id')
      a.textContent = event.target.data('title')
      a.href = '#' + id
      p.textContent = event.target.data('filename')
      event.target.data('label', id)
    })
    this.cy.on('unselect', 'node', event => {
      a.textContent = ''
      p.textContent = ''
      event.target.data('label', event.target.data('title'))
    })
  }

  render (layout = 'breadthfirst') {
    if (layout === 'cose') {
      this.cy.layout({
        name: 'cose',
        nodeDimensionsIncludeLabels: true,
        numIter: 300,
        fit: true
      }).run()
    } else {
      this.cy.layout({
        name: 'breadthfirst',
        spacingFactor: 1.0,
        fit: true,
        directed: true,
        avoidOverlap: true,
        nodeDimensionsIncludeLabels: true
      }).run()
    }
  }
}

function isNoteId (id) {
  // id is the string after # in the URL hash.
  return Boolean(id && Number.isInteger(Number(id)))
  /*
  const fragment = document.getElementById(id)
  return Boolean(fragment?.classList.contains('slipbox-note'))
  */
}

module.exports.init = function init (slipbox) {
  slipbox.colorEntrypoints()
  const extras = document.createElement('div')
  document.querySelector('.slipbox-bottom').appendChild(extras)

  const view = new GraphView(extras.appendChild(graphArea()))

  function resetGraph () {
    // Clear graph display.
    extras.style.display = 'none'

    // Get elements to display.
    const id = window.location.hash.slice(1)
    const elements = !id
      ? slipbox.cy.elements().filter(e => e.isNode() || e.data('source') !== e.data('target'))
      : isNoteId(id)
        ? neighborElements(slipbox, id)
        : clusterElements(slipbox, id)

    // Check if has enough elements.
    if (elements.length < 2) return

    // Display elements.
    extras.style.display = 'block'
    extras.innerHTML = ''
    view.init(extras.appendChild(graphArea()))
    view.cy.add(elements)
    view.render(!id && elements.length > 30 ? 'cose' : 'breadthfirst')
  }

  resetGraph()
  window.addEventListener('hashchange', resetGraph)
}
