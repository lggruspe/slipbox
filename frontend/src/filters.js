function isNote (req) {
  if (!req.id || !Number.isInteger(Number(req.id))) {
    return false
  }
  const fragment = document.getElementById(req.id)
  return Boolean(fragment?.classList.contains('slipbox-note'))
}

function isTag (req) {
  if (!req.id.sartsWith('tags/')) {
    return false
  }
  const fragment = document.getElementById(req.id)
  return Boolean(fragment?.classList.contains('level1'))
}

function isHome (req) {
  return req.id === ''
}

module.exports = {
  isHome,
  isNote,
  isTag
}
