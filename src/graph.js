import cytoscape from 'cytoscape'

function graphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '500px'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  return div
}

function noteElement (id, currentNote = false) {
  return {
    data: {
      id: id,
      label: id,
      color: currentNote ? 'white' : undefined
    }
  }
}

function linkElement (type, source, target) {
  console.assert(['backlink', 'direct', 'sequence'].includes(type))
  const id = type.slice(0, 1) + `${source}-${target}`
  const style = type === 'backlink' ? 'dashed' : 'solid'
  const color = type === 'sequence' ? 'red' : 'black'
  return {
    data: { id, source, target, arrow: 'triangle', style, color }
  }
}

function * neighborElements (query, id) {
  yield noteElement(id, true)
  const note = query.note(id)

  for (const backlink of note.backlinks()) {
    yield noteElement(backlink.src.id)
    yield linkElement('backlink', backlink.src.id, id)
  }
  for (const link of note.links()) {
    yield noteElement(link.dest.id)
    yield linkElement('direct', id, link.dest.id)
  }
  for (const parent of note.parents()) {
    yield noteElement(parent.note.id)
    yield linkElement('sequence', parent.note.id, id)
  }
  for (const child of note.children()) {
    yield noteElement(child.note.id)
    yield linkElement('sequence', id, child.note.id)
  }
  for (const descendant of query.descendants(String(id))) {
    yield noteElement(descendant.note.id)
    yield noteElement(descendant.parentID)
    yield linkElement('sequence', descendant.parentID, descendant.note.id)
  }
}

function createCytoscape (container, elements) {
  return cytoscape({
    directed: true,
    multigraph: true,
    container: container,
    elements: elements,
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          height: 'label',
          width: 'label',
          padding: '8px',
          'text-halign': 'center',
          'text-valign': 'center'
        }
      },
      {
        selector: 'node[color]',
        style: {
          'background-color': 'black',
          color: 'data(color)',
          label: 'data(label)',
          height: 'label',
          width: 'label',
          padding: '8px',
          'text-halign': 'center',
          'text-valign': 'center'
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
}

function init (query) {
  let container = graphArea()

  function resetGraph () {
    container.remove()
    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const elements = Array.from(neighborElements(query, id))
    if (elements.length < 2) return

    container = graphArea()
    document.body.append(container)
    const cy = createCytoscape(container, elements)
    cy.layout({ name: 'cose' }).run()
    cy.reset()
    cy.center()
  }

  resetGraph()
  window.addEventListener('hashchange', resetGraph)
}

export { init }
