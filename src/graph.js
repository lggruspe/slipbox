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

function noteElement (note, currentNote = false) {
  return {
    data: {
      id: note.id,
      title: note.title,
      label: note.id,
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
  const note = query.note(id)
  yield noteElement(note, true)

  for (const backlink of note.backlinks()) {
    yield noteElement(backlink.src)
    yield linkElement('backlink', backlink.src.id, id)
  }
  for (const link of note.links()) {
    yield noteElement(link.dest)
    yield linkElement('direct', id, link.dest.id)
  }
  for (const parent of note.parents()) {
    yield noteElement(parent.note)
    yield linkElement('sequence', parent.note.id, id)
  }
  for (const child of note.children()) {
    yield noteElement(child.note)
    yield linkElement('sequence', id, child.note.id)
  }
  for (const descendant of query.descendants(String(id))) {
    yield noteElement(descendant.note)
    yield noteElement(query.note(descendant.parentID))
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

function noteInfoDiv () {
  const div = document.createElement('div')
  div.style.bottom = 0
  div.style.right = 0
  div.style.padding = '20px'
  div.style.position = 'fixed'
  div.style.zIndex = 1
  return div
}

function hoverHandlers (container) {
  const h3 = document.createElement('h3')
  const infoDiv = noteInfoDiv()
  infoDiv.appendChild(h3)
  container.appendChild(infoDiv)

  const show = event => {
    h3.textContent = event.target.data().title
  }
  const hide = event => {
    h3.textContent = ''
  }
  return [show, hide]
}

function init (query) {
  let container = graphArea()
  let infoContainer = document.createElement('div')

  function resetGraph () {
    container.remove()
    infoContainer.remove()

    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const elements = Array.from(neighborElements(query, id))
    if (elements.length < 2) return

    container = graphArea()
    infoContainer = document.createElement('div')
    document.body.appendChild(infoContainer)
    document.body.appendChild(container)

    const cy = createCytoscape(container, elements)
    cy.layout({ name: 'cose' }).run()
    cy.reset()
    cy.center()

    const [show, hide] = hoverHandlers(infoContainer)
    cy.on('select', 'node', show)
    cy.on('unselect', 'node', hide)
  }

  resetGraph()
  window.addEventListener('hashchange', resetGraph)
}

export { init }
