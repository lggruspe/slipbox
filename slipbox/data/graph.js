function createGraphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '500px'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  return div
}

function getNoteElement (slipbox, id) {
  const note = slipbox.notes[id]
  return {
    data: {
      id: id,
      color: 'black',
      label: note.title
    }
  }
}

function * getNeighborElements (slipbox, id) {
  yield getNoteElement(slipbox, id)

  const note = slipbox.notes[id]
  for (const backlink of note.backlinks) {
    yield getNoteElement(slipbox, backlink.src)
    yield {
      data: {
        id: `${backlink.src}-${id}`,
        source: backlink.src,
        target: id,
        arrow: 'triangle',
        style: 'dashed',
        color: 'black'
      }
    }
  }

  for (const alias of note.aliases) {
    const parent = slipbox.aliases[alias].parent
    let pid = -1
    if (parent) {
      pid = slipbox.aliases[parent].id
    }
    if (pid == -1) continue
    yield getNoteElement(slipbox, pid)
    yield {
      data: {
        id: `${pid}-${id}`,
        source: pid,
        target: id,
        arrow: 'triangle',
        style: 'solid',
        color: 'red'
      }
    }
  }
}

function getElementsFromSlipbox (slipbox) {
  const elements = []
  for (const id of Object.keys(slipbox.notes)) {
    for (const elem of getNeighborElements(slipbox, id)) {
      elements.push(elem)
    }
  }
  return elements
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
          'background-color': 'data(color)'
        }
      },
      {
        selector: 'node[type]',
          style: {
            label: 'data(label)'
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

function createResetButton() {
  const btn = document.createElement('button')
  btn.textContent = 'Reset graph'
  return btn
}

function initGraph () {
  let container = createGraphArea()
  let btn = createResetButton()

  function resetGraph () {
    container.remove()
    btn.remove()
    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const elements = Array.from(getNeighborElements(slipbox, id))
    if (elements.length < 2) return

    btn = createResetButton()
    btn.onclick = function () {
      cy.center()
    }
    container = createGraphArea()
    document.body.append(btn)
    document.body.append(container)
    const cy = createCytoscape(container, elements)
    cy.layout({ name: 'cose' }).run()
    cy.center()
  }

  window.addEventListener('DOMContentLoaded', resetGraph)
  window.addEventListener('hashchange', resetGraph)
}

initGraph()
