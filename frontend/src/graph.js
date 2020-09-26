import cytoscape from 'cytoscape'

function graphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '60vh'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  div.innerHTML = '<hr><div class="info-container"></div>'
  return div
}

function noteElement (note, currentNote = false) {
  return {
    data: {
      id: note.id,
      title: note.title,
      filename: note.filename,
      label: note.id,
      color: 'white',
      bgColor: currentNote ? 'black' : 'gray'
    }
  }
}

function linkElement (type, source, target) {
  console.assert(['backlink', 'direct', 'sequence'].includes(type))
  const id = type.slice(0, 1) + `${source}-${target}`
  const style = type === 'sequence' ? 'dashed' : 'solid'
  const color = 'black'
  return {
    data: { id, source, target, arrow: 'triangle', style, color }
  }
}

function dfs (graph, src) {
  if (!graph[src]) return []
  const edges = []
  const done = new Set()
  const stack = [src]
  while (stack.length > 0) {
    const top = stack.pop()
    if (done.has(top)) continue
    const children = graph[top] || []
    for (const child of children) {
      edges.push([top, child])
      stack.push(child)
    }
    done.add(top)
  }
  return edges
}

function traverse (query, id) {
  const edges = []
  for (const { forward, reverse } of Object.values(query.db.data.clusters)) {
    edges.push(...dfs(forward, id))
    edges.push(...dfs(reverse, id).map(([a, b]) => [b, a]))
  }
  return Array.from(new Set(edges.filter(([a, b]) => a !== b)))
}

function * clusterElements (query, tag) {
  const cluster = query.db.data.clusters[tag] || { forward: [] }
  for (const [src, dests] of Object.entries(cluster.forward)) {
    const source = Number(src)
    yield noteElement(query.note(source))
    for (const dest of dests) {
      if (source !== dest) {
        yield noteElement(query.note(dest))
        yield linkElement('sequence', source, dest)
      }
    }
  }
}

function * neighborElements (query, note) {
  yield noteElement(note, true)

  for (const backlink of note.backlinks()) {
    yield noteElement(backlink.src)
    yield linkElement('backlink', backlink.src.id, note.id)
  }
  for (const link of note.links()) {
    yield noteElement(link.dest)
    yield linkElement('direct', note.id, link.dest.id)
  }
  for (const [src, dest] of traverse(query, note.id)) {
    yield noteElement(query.note(src))
    yield noteElement(query.note(dest))
    yield linkElement('sequence', src, dest)
  }
}

function createCytoscape (container, elements) {
  const cy = cytoscape({
    directed: true,
    multigraph: true,
    container: container,
    elements: elements,
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
          color: 'data(color)',
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
          'line-color': 'data(color)',
          'line-style': 'data(style)'
        }
      },
      {
        selector: 'edge[arrow]',
        style: {
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'data(arrow)'
        }
      }
    ]
  })
  cy.layout({
    name: 'breadthfirst',
    spacingFactor: 1.0,
    fit: true,
    directed: true,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true
  }).run()
  cy.reset()
  cy.center()

  const infoContainer = container.querySelector('div.info-container')
  const [show, hide] = hoverHandlers(infoContainer)
  cy.on('select', 'node', show)
  cy.on('unselect', 'node', hide)
  return cy
}

function noteInfoDiv () {
  const div = document.createElement('div')
  div.style.bottom = 0
  div.style.right = 0
  div.style.padding = '20px'
  div.style.position = 'fixed'
  div.style.maxWidth = '30em'
  div.style.zIndex = 1
  return div
}

function hoverHandlers (container) {
  const header = document.createElement('header')
  header.innerHTML = '<h3><a href=""></a></h3><p></p>'
  const a = header.querySelector('a')
  const p = header.querySelector('p')

  const infoDiv = noteInfoDiv()
  infoDiv.appendChild(header)
  container.appendChild(infoDiv)

  const show = event => {
    const title = event.target.data('title')
    const filename = event.target.data('filename')
    a.textContent = title
    a.href = '#' + event.target.data('id')
    p.textContent = filename
    event.target.data('label', title)
  }
  const hide = event => {
    event.target.data('label', event.target.data('id'))
    a.textContent = ''
    p.textContent = ''
  }
  return [show, hide]
}

function init (query) {
  let container = graphArea()

  function resetGraph () {
    container.remove()
    const id = Number(window.location.hash.slice(1))
    const elements = []
    if (Number.isInteger(id)) {
      const note = query.note(id)
      if (note != null) {
        elements.push(...neighborElements(query, note))
      }
      if (elements.length < 2) return
    } else {
      elements.push(...clusterElements(query, window.location.hash.slice(1)))
      if (elements.length === 0) return
    }
    container = document.body.appendChild(graphArea())
    createCytoscape(container, elements)
  }

  resetGraph()
  window.addEventListener('hashchange', resetGraph)
}

export { init }
