function createGraphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '500px'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  return div
}

function getNoteElement (slipbox, id, currentNote = false) {
  const note = slipbox.notes[id]
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

function * getNeighborElements (slipbox, id) {
  yield getNoteElement(slipbox, id, true)

  const note = slipbox.notes[id]
  for (const backlink of note.backlinks) {
    yield getNoteElement(slipbox, backlink.src)
    yield {
      data: {
        id: `b${backlink.src}-${id}`,
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
    if (pid !== -1) {
      yield getNoteElement(slipbox, pid)
      yield {
        data: {
          id: `p${pid}-${id}`,
          source: pid,
          target: id,
          arrow: 'triangle',
          style: 'solid',
          color: 'red'
        }
      }
    }

    // children
    for (const child of slipbox.aliases[alias].children) {
      console.assert(id === slipbox.aliases[alias].id)
      const cid = slipbox.aliases[child].id
      if (!Number.isInteger(cid)) continue
      yield getNoteElement(slipbox, cid)
      yield {
        data: {
          id: `c${id}-${cid}`,
          source: id,
          target: cid,
          arrow: 'triangle',
          style: 'solid',
          color: 'red'
        }
      }
    }
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

function initGraph () {
  let container = createGraphArea()

  function resetGraph () {
    container.remove()
    const id = Number(window.location.hash.slice(1))
    if (!Number.isInteger(id)) return

    const elements = Array.from(getNeighborElements(slipbox, id))
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

initGraph()
