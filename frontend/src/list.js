function init () {
  const lis = document.querySelectorAll('ol.slipbox-list > li[value]')
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i]
    const id = li.value
    const section = document.querySelector(`section.slipbox-note[id="${id}"]`)
    if (!section) {
      li.remove()
      continue
    }
    const h1 = section.querySelector('h1')
    if (!h1) {
      li.remove()
      continue
    }
    const a = document.createElement('a')
    a.href = `#${id}`
    a.innerHTML = h1.innerHTML
    li.appendChild(a)
  }
}

export { init }
