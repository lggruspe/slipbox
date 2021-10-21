export function init () {
  const lis = document.querySelectorAll('.slipbox-list > li[value]')
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i]
    const id = li.getAttribute('value')
    const section = document.querySelector(`section.slipbox-note[id="${id}"]`)
    if (!section) {
      li.remove()
      continue
    }
    const a = document.createElement('a')
    a.href = `#${id}`
    a.innerHTML = section.querySelector('h1').innerHTML

    li.textContent = `${id} – `
    li.appendChild(a)
  }
}
