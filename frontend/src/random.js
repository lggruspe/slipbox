export function init (slipbox) {
  const random = () => '#' + Math.floor(Math.random() * slipbox.cy.nodes().length)
  const a = document.querySelector('nav a[href="#random"]')
  a.addEventListener('click', () => { a.href = random() })
}
