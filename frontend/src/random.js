export function init (slipbox) {
  const ids = slipbox.cy.nodes().map(e => e.data('id'))
  const random = () => '#' + ids[Math.floor(Math.random() * ids.length)]
  const a = document.querySelector('nav a[href="#random"]')
  a.addEventListener('click', () => { a.href = random() })
}
