/* Flashcard data is stored in window.localStorage.
 *
 * Ex:
 *
 * Set last 7 attempts to recall note 1.
 *     window.localStorage.setItem('1.recent', '0010111')
 *
 * Get total number of attempts.
 *     window.localStorage.getItem('1.total')
 *
 * Get number of successful recalls.
 *     window.localStorage.getItem('1.score')
 */

function getScore (id) {
  return Number(window.localStorage.getItem(`${id}.score`))
}

function setScore (id, score) {
  window.localStorage.setItem(`${id}.score`, score)
}

function getTotal (id) {
  return Number(window.localStorage.getItem(`${id}.total`))
}

function setTotal (id, total) {
  window.localStorage.setItem(`${id}.total`, total)
}

function getRecent (id) {
  return window.localStorage.getItem(`${id}.recent`)
}

function popRecent (id) {
  const recent = getRecent(id) || ''
  window.localStorage.setItem(`${id}.recent`, recent.slice(0, recent.length - 1))
}

function pushRecent (id, success) {
  const recent = window.localStorage.getItem(`${id}.recent`)
  window.localStorage.setItem(`${id}.recent`, recent + (success ? '1' : '0'))
}

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = array[i]
    array[i] = array[j]
    array[j] = x
  }
}

class Flashcard {
  constructor (container) {
    this.pressed = null
    this.container = container
    this.container.classList.add('slipbox-srs')
    window.addEventListener('hashchange', () => {
      this.pressed = null
      this.render()
    })
  }

  pressUp (id) {
    const score = getScore(id)
    const total = getTotal(id)
    switch (this.pressed) {
      case 'up':
        this.pressed = null
        setScore(id, score - 1)
        setTotal(id, total - 1)
        popRecent(id)
        break
      case 'down':
        this.pressed = 'up'
        setScore(id, score + 1)
        popRecent(id)
        pushRecent(id, true)
        break
      default:
        this.pressed = 'up'
        setScore(id, score + 1)
        setTotal(id, total + 1)
        pushRecent(id, true)
    }
    this.render()
  }

  pressDown (id) {
    const score = getScore(id)
    const total = getTotal(id)
    switch (this.pressed) {
      case 'up':
        this.pressed = 'down'
        setScore(id, score - 1)
        popRecent(id)
        pushRecent(id, false)
        break
      case 'down':
        this.pressed = null
        setTotal(id, total - 1)
        popRecent(id)
        break
      default:
        this.pressed = 'down'
        setTotal(id, total + 1)
        pushRecent(id, false)
    }

    this.render()
  }

  render () {
    this.container.innerHTML = ''
    const id = window.location.hash.slice(1)
    if (!id || !Number.isInteger(Number(id))) return

    this.container.innerHTML = `
      <button class="slipbox-srs-down">▼</button>
      <span class="slipbox-srs-score">${getScore(id)}</span>
      out of
      <span class="slipbox-srs-total">${getTotal(id)}</span>
      <button class="slipbox-srs-up">▲</button>
    `

    const down = this.container.querySelector('.slipbox-srs-down')
    const up = this.container.querySelector('.slipbox-srs-up')
    const score = this.container.querySelector('.slipbox-srs-score')
    const total = this.container.querySelector('.slipbox-srs-total')
    up.addEventListener('click', () => this.pressUp(id))
    down.addEventListener('click', () => this.pressDown(id))

    switch (this.pressed) {
      case 'up':
        up.classList.add('slipbox-srs-pressed')
        down.classList.remove('slipbox-srs-pressed')
        break
      case 'down':
        up.classList.remove('slipbox-srs-pressed')
        down.classList.add('slipbox-srs-pressed')
        break
      default:
        up.classList.remove('slipbox-srs-pressed')
        down.classList.remove('slipbox-srs-pressed')
    }
    score.textContent = getScore(id)
    total.textContent = getTotal(id)
  }
}

class Scheduler {
  constructor (link, ids) {
    this.sched = []
    this.container = link
    this.ids = ids
  }

  isReady (id) {
    let recent = getRecent(id) || ''
    // Truncate recent to last 8 if it's too long.
    if (recent.length > 8) {
      recent = recent.slice(recent.length - 8, recent.length)
    }
    const array = Array.from(recent)
    const ones = array.reduce((t, x) => x === '0' ? t : t + 1, 0)
    window.localStorage.setItem(`${id}.recent`, recent)
    return Math.random() <= 2 ** (-ones)
  }

  schedule () {
    if (this.sched.length > 0) return
    shuffle(this.ids)
    for (const id of this.ids) {
      if (this.isReady(id)) {
        this.sched.push(id)
      }
    }
  }

  render () {
    this.container.addEventListener('click', () => {
      this.container.href = '#' + this.next()
    })
  }

  next () {
    while (this.sched.length === 0) {
      this.schedule()
    }
    return this.sched.pop()
  }
}

export function init (slipbox) {
  const container = document.createElement('div')
  document.querySelector('.slipbox-bottom').appendChild(container)
  new Flashcard(container).render()
  new Scheduler(
    document.querySelector('nav a[href="#random"]'),
    slipbox.cy.nodes().map(e => e.data('id'))
  ).render()
}
