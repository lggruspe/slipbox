function randomChoice (choices) {
  const index = Math.floor(Math.random() * choices.length)
  return choices[index]
}

/// Return note ID of random outgoer or root.
function shuffle (cy) {
  const id = window.location.hash.slice(1)
  if (id && Number.isInteger(Number(id))) {
    const outgoers = cy.$(`#${id}`).outgoers().nodes()
    if (outgoers.length > 0) {
      return randomChoice(outgoers).data('id')
    }
  }
  return randomChoice(cy.nodes().roots()).data('id')
}

/// Register shuffle button callbacks.
function registerShuffleButton (cy, button) {
  button.addEventListener('click', () => {
    window.location.hash = `#${shuffle(cy)}`
  })
}

export { registerShuffleButton }
