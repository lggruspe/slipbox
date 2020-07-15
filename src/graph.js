import cytoscape from 'cytoscape'

function createGraphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '500px'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  return div
}

function getNoteElement (id, currentNote = false) {
  const element = {
    data: {
      id: id,
      label: id
    }
  }
  if (currentNote) {
    element.data.color = 'white'
  }
  return element
}

function getLinkElement (type, source, target) {
  console.assert(['backlink', 'direct', 'sequence'].includes(type))
  const id = type.slice(0, 1) + `${source}-${target}`
  const style = type === 'backlink' ? 'dashed' : 'solid'
  const color = type === 'sequence' ? 'red' : 'black'
  return {
    data: { id, source, target, arrow: 'triangle', style, color }
  }
}

function * neighborElements (query, id) {
  yield getNoteElement(id, true)
  const note = query.note(id)

  for (const backlink of note.backlinks()) {
    yield getNoteElement(backlink.src.id)
    yield getLinkElement('backlink', backlink.src.id, id)
  }
  for (const link of note.links()) {
    yield getNoteElement(link.dest.id)
    yield getLinkElement('direct', id, link.dest.id)
  }
  for (const parent of note.parents()) {
    yield getNoteElement(parent.note.id)
    yield getLinkElement('sequence', parent.note.id, id)
  }
  for (const child of note.children()) {
    yield getNoteElement(child.note.id)
    yield getLinkElement('sequence', id, child.note.id)
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
  let container = createGraphArea()

  function resetGraph () {
    container.remove()
    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const elements = Array.from(neighborElements(query, id))
    if (elements.length < 2) return

    container = createGraphArea()
    document.body.append(container)
    const cy = createCytoscape(container, elements)
    cy.layout({ name: 'cose' }).run()
    cy.reset()
    cy.center()
  }

  window.addEventListener('DOMContentLoaded', resetGraph)
  window.addEventListener('hashchange', resetGraph)
}

export { init }
