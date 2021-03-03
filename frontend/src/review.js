const { check, DomWriter, Router } = require('@lggruspe/fragment-router')
const { View } = require('@lggruspe/view-hooks')
const { isNote, isHome } = require('./filters.js')
const { List } = require('./linked-list.js')

class Flashcard extends List {
  constructor (id, prompt, response) {
    super()
    this.id = id
    this.prompt = prompt
    this.response = response
    this.status = 'hidden'
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
}

class FlashcardDeck {
  constructor (card) {
    this.current = card
  }

  isDone () {
    if (this.current == null) return true
    if (this.current.next !== this) return false
    return this.current.status === 'done'
  }

  start () {
    if (this.current == null) {
      return
    }
    this.current.setStatus('prompt')
  }

  again () {
    if (this.current == null) {
      return
    }
    this.current.setStatus('hidden')
    if (this.current.next !== this.current) {
      this.current = this.current.next
      this.current.setStatus('prompt')
    } else {
      this.current.setStatus('prompt')
    }
  }

  next () {
    if (this.current == null) {
      return
    }
    this.current.setStatus('done')
    if (this.current.next !== this.current) {
      this.current = this.current.remove()
      this.current.setStatus('prompt')
    } else {
      this.current = null
    }
  }

  * [Symbol.iterator] () {
    let current = this.current
    if (current != null) {
      yield current
      current = current.next
      while (current !== this.current) {
        yield current
        current = current.next
      }
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
      <h1 class="flashcard-prompt">${this.state.prompt.innerHTML}</h1>
      <div class="buttons">
        <button type="button" class="button flashcard-show is-${this.state.status}">Show answer</button>
      </div>
      <div class="flashcard-response is-${this.state.status}">${this.state.response.innerHTML}</div>
      <div class="buttons">
        <button type="button" class="button flashcard-again is-${this.state.status}">Again?</button>
        <button type="button" class="button flashcard-next is-${this.state.status}">Next&gt;</button>
      </div>
    `
    this.$('.flashcard-response').querySelector('h1')?.remove()
    this.$('.flashcard-show').addEventListener('click', () => this.state.setStatus('response'))
  }

  update () {
    this.$('.flashcard-show').className = `button flashcard-show is-${this.state.status}`
    this.$('.flashcard-again').className = `button flashcard-again is-${this.state.status}`
    this.$('.flashcard-next').className = `button flashcard-next is-${this.state.status}`
    this.$('.flashcard-response').className = `flashcard-response is-${this.state.status}`
  }
}

class DeckView extends View {
  constructor (deck, container) {
    super({
      container,
      state: deck,
      hooks: ['again', 'next']
    })
  }

  initialize (container) {
    this.cardViews = new Map()
    container.innerHTML = ''
    const fragment = document.createDocumentFragment()
    for (const card of this.state) {
      const cardContainer = document.createElement('div')
      cardContainer.className = 'flashcard'
      fragment.appendChild(cardContainer)
      this.cardViews.set(card, new CardView(card, cardContainer))
    }
    const doneDiv = document.createElement('div')
    doneDiv.className = `flashcard flashcard-end ${!this.state.isDone() ? 'is-hidden' : ''}`
    doneDiv.innerHTML = `
      <p>You've reached the end!</p>
      <div class="buttons">
        <a href="#review/" class="button">Go back</a>
      </div>
    `
    fragment.appendChild(doneDiv)

    container.appendChild(fragment)

    // register button event listeners in cards
    for (const card of this.state) {
      const view = this.cardViews.get(card)
      view.$('.flashcard-again').onclick = () => this.state.again()
      view.$('.flashcard-next').onclick = () => this.state.next()
    }
  }

  update () {
    this.$('.flashcard-end').className = `flashcard flashcard-end ${!this.state.isDone() ? 'is-hidden' : ''}`
    this.state.isDone()
      ? this.$('.flashcard-end').scrollIntoView()
      : this.cardViews.get(this.state.current).container.scrollIntoView()
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
  return new Flashcard(id, prompt, response)
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
      container.className = 'flashcard'
      return new SummarizedCardView(card, container)
    })
    for (const view of views) {
      container.appendChild(view.container)
    }
  }

  update () {}
}

function createDeck (id) {
  const card = createCard(id)
  const descendants = window.slipbox.cy.nodes(`#${id}`).descendants().map(createCard)
  const deck = descendants.reduce((t, a) => t.append(a), card)
  return new FlashcardDeck(deck)
}

const router = new Router()
const writer = new DomWriter(router)

router.route(
  check(isNote),
  req => {
    const deck = createDeck(req.id)
    deck.start()
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

module.exports = {
  router,
  Flashcard
}
