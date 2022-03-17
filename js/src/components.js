import '@shoelace-style/shoelace/dist/components/dialog/dialog.js'
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js'
import '@shoelace-style/shoelace/dist/components/icon/icon.js'
import '@shoelace-style/shoelace/dist/components/input/input.js'
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js'
import '@shoelace-style/shoelace/dist/themes/light.css'

import './icons.js'

/**
 * @param title string
 * @param external boolean
 * @return HTMLElement
 */
function tooltip (title, external) {
  const elem = document.createElement('sl-tooltip')
  const icon = '<sl-icon library="boxicons" name="bx-link-external"></sl-icon>'
  elem.innerHTML = `<div slot="content">${title} ${external ? icon : ''}</div>`
  return elem
}

/**
 * @param icon string
 * @return { library: string, name: string } | null
 */
function parseIcon (icon) {
  const parts = icon.split('/')
  if (parts.length < 2) {
    return null
  }
  const library = parts[0]
  const name = parts.slice(1).join('')
  return { library, name }
}

/**
 * @param icon { library: string, name: string }
 * @param href string?
 * @return HTMLButtonElement
 */
function iconButton (icon, href) {
  const btn = document.createElement('sl-icon-button')
  btn.style.fontSize = '1.25rem'
  btn.library = icon.library
  btn.name = icon.name
  if (href != null) {
    btn.href = href
  }
  return btn
}

/**
 * @param tooltip HTMLElement
 * @param iconButton HTMLButtonElement
 * @return HTMLElement
 */
function navItem (tooltip, iconButton) {
  tooltip.append(iconButton)
  return tooltip
}

customElements.define('sb-nav-item', class extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    const title = this.getAttribute('title') || ''
    const external = this.getAttribute('external') != null

    const href = this.getAttribute('href')
    const icon = parseIcon(this.getAttribute('icon') || '')
    if (icon == null) {
      throw new Error('sb-nav-item: invalid icon')
    }

    const child = navItem(
      tooltip(title, external),
      iconButton(icon, href)
    )
    this.shadowRoot.append(child)
  }
})
