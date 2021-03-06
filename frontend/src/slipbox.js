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
