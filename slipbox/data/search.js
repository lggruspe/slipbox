function createFuse () {
  const options = {
    includeScore: true,
    ignoreLocation: true,
    keys: ['textContent']
  }
  const nodes = document.body.querySelectorAll('section.level1')
  const sections = Array.prototype.filter.call(nodes, function (node) {
    return Number.isInteger(Number(node.id))
  })
  return new Fuse(sections, options)
}
