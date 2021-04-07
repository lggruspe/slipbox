const { check, DomWriter, Router } = require('@lggruspe/fragment-router')
const ui = require('loulou')
const { isNote, isHome } = require('./filters.js')
const { List } = require('./linked-list.js')

class Flashcard extends List {
  constructor (id, prompt, response) {
    super({ id, prompt, response, status: 'hidden' })
  }

  get id () {
    return this.data.id
  }

  get prompt () {
    return this.data.prompt
  }

  get response () {
    return this.data.response
  }

  get status () {
    return this.data.status
  }

  setStatus (value) {
    switch (value) {
      case 'hidden':
      case 'prompt':
      case 'response':
      case 'done':
        this.data.status = value
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

class CardView {
  constructor (card) {
    this.card = card
    this.ui = new ui.Ui($ => this.update($))
    this.ui.watch(this.card, 'setStatus')
  }

  render () {
    const $ = ui.to$(`
      <div class="flashcard">
        <h2 class="flashcard-prompt">${this.card.prompt.innerHTML}</h2>
        <div class="buttons">
          <button type="button" class="button flashcard-show is-${this.card.status}">Show answer</button>
        </div>
        <div class="flashcard-response is-${this.card.status}">${this.card.response.innerHTML}</div>
        <div class="buttons">
          <button type="button" class="button flashcard-again is-${this.card.status}">Again?</button>
          <button type="button" class="button flashcard-next is-${this.card.status}">Next&gt;</button>
        </div>
      </div>
    `)
    $('.flashcard-response h1')?.remove()
    $('.flashcard-show').onclick = () => this.card.setStatus('response')
    return $()
  }

  update ($) {
    $('.flashcard-show').className = `button flashcard-show is-${this.card.status}`
    $('.flashcard-again').className = `button flashcard-again is-${this.card.status}`
    $('.flashcard-next').className = `button flashcard-next is-${this.card.status}`
    $('.flashcard-response').className = `flashcard-response is-${this.card.status}`
  }
}

class DeckView {
  constructor (deck) {
    this.deck = deck
    this.ui = new ui.Ui($ => this.update($))
    this.ui.watch(this.deck, 'again')
    this.ui.watch(this.deck, 'next')
    this.cardViews = new Map()
  }

  render () {
    const elem = ui.toElem('<div></div>')
    for (const card of this.deck) {
      const view = ui.render(new CardView(card), elem)
      this.cardViews.set(card, view)
    }
    elem.appendChild(ui.toElem(`
      <div class="flashcard flashcard-end ${!this.deck.isDone() ? 'is-hidden' : ''}">
        <p>You've reached the end!</p>
        <div class="buttons">
          <a href="#review/" class="button">Go back</a>
        </div>
      </div>
    `))

    // register button event listeners in cards
    for (const card of this.deck) {
      const view = this.cardViews.get(card)
      view.querySelector('.flashcard-again').onclick = () => this.deck.again()
      view.querySelector('.flashcard-next').onclick = () => this.deck.next()
    }
    return elem
  }

  update ($) {
    $('.flashcard-end').className = `flashcard flashcard-end ${!this.deck.isDone() ? 'is-hidden' : ''}`
    this.deck.isDone()
      ? $('.flashcard-end').scrollIntoView()
      : this.cardViews.get(this.deck.current).scrollIntoView()
  }
}

function createSummarizedCardView (card) {
  return ui.toElem(`
    <div class="flashcard">
      <a href="#review/${card.id}">${card.prompt.innerHTML}</a>
    </div>
  `)
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

function createSrsPageView () {
  const elem = ui.toElem(`
    <div>
      <h1>Review notes</h1>
      <p>Pick a question to start with.</p>
    </div>
  `)
  for (const entrypoint of getEntrypoints()) {
    const card = createCard(entrypoint.id())
    const view = createSummarizedCardView(card)
    ui.render(view, elem)
  }
  return elem
}

function randomChoice (collection) {
  const length = collection.length
  const index = Math.floor(Math.random() * length)
  return collection[index]
}

function randomPath (source) {
  const path = [source.id()]
  for (;;) {
    const children = source.outgoers().edges().targets(e => !path.includes(e.id()))
    if (children.length === 0) {
      break
    }
    const child = randomChoice(children)
    path.push(child.id())
    source = child
  }
  return path
}

function createDeck (id) {
  const path = randomPath(window.slipbox.cy.$(`#${id}`))
  const cards = path.map(createCard)
  const deck = cards.reduce((acc, cur) => acc.append(cur))
  return new FlashcardDeck(deck)
}

const router = new Router()
const writer = new DomWriter(router)

router.route(
  check(isNote),
  req => {
    const deck = createDeck(req.id)
    deck.start()
    router.defer(() => writer.render(ui.render(
      new DeckView(deck),
      document.body
    )))
    router.onExit(() => writer.restore())
  }
)

router.route(
  check(isHome),
  () => {
    router.defer(() => writer.render(ui.render(
      createSrsPageView(),
      document.body
    )))
    router.onExit(() => writer.restore())
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
