function redirectHome () {
  if (!window.location.hash.slice(1)) {
    window.location.replace('#home')
  }
}

module.exports.init = function () {
  window.addEventListener('DOMContentLoaded', redirectHome)
  window.addEventListener('hashchange', redirectHome)
}
