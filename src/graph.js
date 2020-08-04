import cytoscape from 'cytoscape'

function graphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '60vh'
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
  for (const parent of note.parents()) {
    yield noteElement(parent.note)
    yield linkElement('sequence', parent.note.id, note.id)
  }
  for (const child of note.children()) {
    yield noteElement(child.note)
    yield linkElement('sequence', note.id, child.note.id)
  }
  for (const alias of note.aliases()) {
    for (const ancestor of query.ancestors(alias)) {
      yield noteElement(ancestor.note)
      yield noteElement(query.note(ancestor.childID))
      yield linkElement('sequence', ancestor.note.id, ancestor.childID)
    }
    for (const descendant of query.descendants(alias)) {
      yield noteElement(descendant.note)
      yield noteElement(query.note(descendant.parentID))
      yield linkElement('sequence', descendant.parentID, descendant.note.id)
    }
  }
}

function createCytoscape (container, elements) {
  return cytoscape({
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
  const h3 = document.createElement('h3')
  const a = document.createElement('a')
  h3.appendChild(a)
  const infoDiv = noteInfoDiv()
  infoDiv.appendChild(h3)
  container.appendChild(infoDiv)

  const show = event => {
    const title = event.target.data('title')
    a.textContent = title
    a.href = '#' + event.target.data('id')
    event.target.data('label', title)
  }
  const hide = event => {
    event.target.data('label', event.target.data('id'))
    a.textContent = ''
  }
  return [show, hide]
}

function init (query) {
  let container = graphArea()
  let infoContainer = document.createElement('div')
  const hr = document.createElement('hr')

  function resetGraph () {
    hr.remove()
    container.remove()
    infoContainer.remove()

    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const note = query.note(id)
    const elements = []
    if (note != null) {
      elements.push(...neighborElements(query, note))
    }
    if (elements.length < 2) return

    container = graphArea()
    infoContainer = document.createElement('div')
    document.body.appendChild(hr)
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
