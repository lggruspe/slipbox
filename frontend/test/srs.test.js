const srs = require('../src/srs.js')
const { JSDOM } = require('jsdom')
const assert = require('assert')
const { Flashcard, Scheduler } = srs

function createDOM (url = 'https://example.com') {
  const body = `
  <body>
    <div class="srs"></div>
    <nav><a href="#random">Random</a></nav>
  </body>
  `
  return new JSDOM(body, { url })
}

beforeEach(function () {
  this.dom = createDOM()
  global.window = this.dom.window
  this.card = new Flashcard(global.window.document.querySelector('.srs'))
})

afterEach(function () {
  delete global.window
})

describe('Flashcard', function () {
  beforeEach(function () {
    this.card = new Flashcard(global.window.document.querySelector('.srs'))
  })

  describe('constructor', function () {
    it('should have no pressed buttons', function () {
      assert.strictEqual(this.card.pressed, null)
    })
  })

  describe('pressUp', function () {
    describe('if no button was previously pressed', function () {
      it('up button should now be pressed', function () {
        assert.strictEqual(this.card.pressed, null)
        this.card.pressUp()
        assert.strictEqual(this.card.pressed, 'up')
      })
    })

    describe('if up button was previously pressed', function () {
      it('up button should be unpressed', function () {
        this.card.pressUp()
        assert.strictEqual(this.card.pressed, 'up')
        this.card.pressUp()
        assert.strictEqual(this.card.pressed, null)
      })
    })

    describe('if down button was previously pressed', function () {
      it('up button should now be pressed', function () {
        this.card.pressDown()
        assert.strictEqual(this.card.pressed, 'down')
        this.card.pressUp()
        assert.strictEqual(this.card.pressed, 'up')
      })
    })
  })

  describe('pressDown', function () {
    describe('if no button was previously pressed', function () {
      it('down button should now be pressed', function () {
        assert.strictEqual(this.card.pressed, null)
        this.card.pressDown()
        assert.strictEqual(this.card.pressed, 'down')
      })
    })

    describe('if up button was previously pressed', function () {
      it('down button should now be pressed', function () {
        this.card.pressUp()
        assert.strictEqual(this.card.pressed, 'up')
        this.card.pressDown()
        assert.strictEqual(this.card.pressed, 'down')
      })
    })

    describe('if down button was previously pressed', function () {
      it('down button should be unpressed', function () {
        this.card.pressDown()
        assert.strictEqual(this.card.pressed, 'down')
        this.card.pressDown()
        assert.strictEqual(this.card.pressed, null)
      })
    })
  })

  describe('render', function () {
    it('should not crash', function () {
      this.card.render()
    })

    describe('with URL hash', function () {
      beforeEach(function () {
        this.dom = createDOM('https://example.com#1')
        global.window = this.dom.window
        this.card = new Flashcard(global.window.document.querySelector('.srs'))
      })

      afterEach(function () {
        delete global.window
      })

      it('should insert button and span elements', function () {
        this.card.render()
        assert(this.dom.window.document.querySelector('.slipbox-srs-down'))
        assert(this.dom.window.document.querySelector('.slipbox-srs-up'))
        assert(this.dom.window.document.querySelector('.slipbox-srs-total'))
        assert(this.dom.window.document.querySelector('.slipbox-srs-score'))
      })

      describe('if up button is pressed', function () {
        it('should add .slipbox-srs-pressed class to up button', function () {
          this.card.pressUp()
          assert.strictEqual(this.card.pressed, 'up')
          assert(
            this.dom.window.document.querySelector('.slipbox-srs-up')
              .classList.contains('slipbox-srs-pressed')
          )
        })
      })

      describe('if down button is pressed', function () {
        it('should add .slipbox-srs-pressed class to down button', function () {
          this.card.pressDown()
          assert.strictEqual(this.card.pressed, 'down')
          assert(
            this.dom.window.document.querySelector('.slipbox-srs-down')
              .classList.contains('slipbox-srs-pressed')
          )
        })
      })
    })
  })
  // TODO test on url hash change
})

describe('Scheduler', function () {
  beforeEach(function () {
    this.scheduler = new Scheduler(
      global.window.document.querySelector('nav a[href="#random"]'),
      ['1', '2', '3', '4', '5']
    )
  })

  describe('(check global.window)', function () {
    it('should exist', function () {
      assert(global.window)
    })
  })

  describe('constructor', function () {
    it('should initially have empty queue', function () {
      assert.strictEqual(this.scheduler.sched.length, 0)
    })

    it('(check initialized test IDs)', function () {
      assert.deepStrictEqual(
        this.scheduler.ids,
        ['1', '2', '3', '4', '5']
      )
    })
  })

  describe('isReady', function () {
    describe('if card has never been reviewed', function () {
      it('should always be ready', function () {
        assert.strictEqual(srs._getRecent('1'), null)
        assert(this.scheduler.isReady('1'), true)
      })
    })
  })

  describe('schedule', function () {
    describe('if queue is empty', function () {
      it('should schedule a permutation of the card IDs', function () {
        assert.strictEqual(this.scheduler.sched.length, 0)
        this.scheduler.schedule()
        assert.strictEqual(this.scheduler.sched.length, 5)
      })
    })

    describe('if queue is not empty', function () {
      it('should not do anything', function () {
        this.scheduler.schedule()
        const copy = Array.from(this.scheduler.sched)
        assert(copy.length > 0)

        this.scheduler.schedule().schedule().schedule()
        assert.deepStrictEqual(this.scheduler.sched, copy)
      })
    })
  })

  describe('next', function () {
    it('should return an element of scheduler.ids', function () {
      for (let i = 0; i < 10; i++) {
        assert(this.scheduler.ids.includes(this.scheduler.next()))
      }
    })
  })

  describe('render', function () {
    it('should not crash', function () {
      this.scheduler.render()
    })
  })
})
