const { check, DomWriter, Router } = require('@lggruspe/fragment-router')
const { View } = require('@lggruspe/view-hooks')
const { isNote, isHome } = require('./filters.js')

class Card {
  constructor (id, prompt, response) {
    this.id = id
    this.prompt = prompt
    this.response = response
    this.status = 'hidden' // 'prompt', 'response', 'done'
    this.attempts = 0
    // NOTE visibility state is handled in parent container
  }

  setStatus (value) {
    switch (value) {
      case 'hidden':
      case 'prompt':
      case 'response':
      case 'done':
        this.status = value
        break
      default:
        throw new Error('invalid value')
    }
  }

  again (nextCard) {
    this.attempts++
    this.setStatus('hidden')
    if (nextCard) {
      nextCard.setStatus('prompt')
    }
  }

  next (nextCard) {
    this.setStatus('done')
    if (nextCard) {
      nextCard.setStatus('prompt')
    }
  }
}

class CardView extends View {
  constructor (card, container) {
    super({
      container,
      state: card,
      hooks: ['setStatus']
    })
  }

  initialize (container) {
    container.innerHTML = `
      <h1 class="srs-prompt">${this.state.prompt.innerHTML}</h1>
      <button type="button" class="srs-button-show ${this.state.status}">Show answer</button>
      <div class="srs-response ${this.state.status}">${this.state.response.innerHTML}</div>
      <button type="button" class="srs-button-again ${this.state.status}">Again?</button>
      <button type="button" class="srs-button-next ${this.state.status}">Next&gt;</button>
    `
    this.$('.srs-response').querySelector('h1')?.remove()
    this.$('.srs-button-show').addEventListener('click', () => this.state.setStatus('response'))
  }

  update () {
    this.$('.srs-button-show').className = `srs-button-show ${this.state.status}`
    this.$('.srs-response').className = `srs-response ${this.state.status}`
  }
}

class Deck {
  constructor (cards) {
    this.due = cards
    this.done = []
  }

  isDone () {
    return this.due.length === 0
  }

  answer (card, correct) {
    const next = this.due[0]
    if (!correct) {
      card?.again(next)
    } else {
      card?.next(next)
      const index = this.due.indexOf(card)
      if (index !== -1) {
        const removed = this.due.splice(index, 1)
        this.done.push(...removed)
      }
    }
  }
}

class DeckView extends View {
  constructor (deck, container) {
    super({
      container,
      state: deck,
      hooks: ['answer']
    })
  }

  initialize (container) {
    this.cardViews = new Map()
    container.innerHTML = ''
    const fragment = document.createDocumentFragment()
    for (const card of this.state.due) {
      const cardContainer = document.createElement('div')
      cardContainer.className = 'srs-card'
      fragment.appendChild(cardContainer)
      this.cardViews.set(card, new CardView(card, cardContainer))
    }
    const doneDiv = document.createElement('div')
    doneDiv.className = `srs-review-done ${!this.state.isDone() ? 'not-' : ''}done`
    doneDiv.innerHTML = `
      <p>You've reached the end!</p>
      <a href="#review/" class="srs-button">Go back</button>
    `
    fragment.appendChild(doneDiv)

    container.appendChild(fragment)

    // register button event listeners in cards
    for (const card of this.state.due) {
      const view = this.cardViews.get(card)
      view.$('.srs-button-again').onclick = () => this.state.answer(card, false)
      view.$('.srs-button-next').onclick = () => this.state.answer(card, true)
    }
    for (const card of this.state.done) {
      const view = this.cardViews.get(card)
      view.$('.srs-button-again').onclick = () => this.state.answer(card, false)
      view.$('.srs-button-next').onclick = () => this.state.answer(card, true)
    }
  }

  update () {
    this.state.isDone()
      ? this.$('.srs-review-done').scrollIntoView()
      : this.cardViews.get(this.state.due[0]).container.scrollIntoView()
  }
}

class SummarizedCardView extends View {
  constructor (card, container) {
    super({
      container,
      state: card
    })
  }

  initialize (container) {
    container.innerHTML = `<a href="#review/${this.state.id}"></a>`
    this.$('a').innerHTML = this.state.prompt.innerHTML
  }

  update () {}
}

function getEntrypoints () {
  return window.slipbox.cy.nodes(e => e.indegree(false) === 0)
}

function createCard (id) {
  const ref = document.getElementById(id)
  const prompt = ref.querySelector('h1').cloneNode(true)
  const response = ref.cloneNode(true)
  prompt.id = ''
  return new Card(id, prompt, response)
}

class SrsPageView extends View {
  constructor (container) {
    super({ container })
  }

  initialize (container) {
    container.innerHTML = `
      <h1>Review notes</h1>
      <p>Pick a question to start with.</p>
    `
    const views = getEntrypoints().map(e => {
      const card = createCard(e.id())
      const container = document.createElement('div')
      container.className = ' srs-card-summary'
      return new SummarizedCardView(card, container)
    })
    for (const view of views) {
      container.appendChild(view.container)
    }
  }

  update () {}
}

function createDeck (id) {
  const cards = [createCard(id)]
  const descendants = window.slipbox.cy.nodes(`#${id}`).descendants().map(createCard)
  cards.push(...descendants)
  return new Deck(cards)
}

const router = new Router()
const writer = new DomWriter(router)

router.route(
  check(isNote),
  req => {
    const deck = createDeck(req.id)
    const container = document.createElement('div')
    const view = new DeckView(deck, container)
    router.defer(() => writer.render(view.container))
  }
)

router.route(
  check(isHome),
  () => {
    const container = document.createElement('div')
    const view = new SrsPageView(container)
    router.defer(() => writer.render(view.container))
  }
)

router.route(
  () => router.defer(() => {
    writer.restore()
    window.location.replace('#review/')
  })
)

module.exports = router
