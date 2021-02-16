exports.flip = function flip (ok, fail) {
  return window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1)
    const fragment = document.getElementById(id)
    if (fragment && ok) {
      [ok].flat().forEach(fn => fn(fragment))
    } else if (fail) {
      [fail].flat().forEach(fn => fn())
    }
  })
}
