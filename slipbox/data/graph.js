function createGraphArea () {
  const div = document.createElement('div')
  div.style.width = '100%'
  div.style.height = '500px'
  div.style.position = 'relative'
  div.style.top = '0px'
  div.style.left = '0px'
  return div
}

function getElementsFromSlipbox (slipbox) {
  const elements = []
  for (let [id, note] of Object.entries(slipbox.notes)) {
    id = Number(id)
    elements.push({
      data: {
        id: id,
        color: 'black',
        label: note.title
      }
    })

    for (const backlink of note.backlinks) {
      elements.push({
        data: {
          id: `${backlink.src}-${id}`,
          source: backlink.src,
          target: id,
          style: 'dashed',
          color: 'black'
        }
      })
    }

    for (const alias of note.aliases) {
      const parent = slipbox.aliases[alias].parent
      let pid = -1
      if (parent) {
        pid = slipbox.aliases[parent].id
      }
      if (pid == -1) continue;
      elements.push({
        data: {
          id: `${pid}-${id}`,
          source: pid,
          target: id,
          style: 'solid',
          color: 'red'
        }
      })
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
          'target-arrow-shape': 'triangle'
        }
      }
    ]
  })
}

var cy = {}
window.addEventListener('DOMContentLoaded', function () {
  const container = createGraphArea()
  document.body.append(container)
  const elements = getElementsFromSlipbox(slipbox)
  cy = createCytoscape(container, elements)
  cy.layout({ name: 'cose' }).run()
})
