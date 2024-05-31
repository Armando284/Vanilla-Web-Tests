import { NUMBERS } from './numbers.js'

const STYLE = `
section {
  --responsive-size: 6px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(7, 1fr);
  background: #333;
  border-radius: 3px;
  padding: var(--responsive-size);
  box-shadow: 6px 10px 10px #000;
  div {
    width: var(--responsive-size);
    height: var(--responsive-size);
    border-radius: 50%;
    background: black;
    transition: background 0.3s ease-in-out;
    &.active {
      background: red;
      box-shadow: 0 0 8px rgba(200, 100, 0, 0.8);
    }
  }
}

/* sm */
@media (min-width: 640px) {
  section{
    --responsive-size: 8px;
  }
}

/* md */
@media (min-width: 768px) {
  section{
    --responsive-size: 8px;
  }
}

/* lg */
@media (min-width: 1024px) {
  section{
    --responsive-size: 8px;
  }
}

/* xl */
@media (min-width: 1280px) {
  section{
    --responsive-size: 8px;
  }
}

/* 2xl */
@media (min-width: 1536px) {
  section{
    --responsive-size: 8px;
  }
}
`

class NumberScreen extends HTMLElement {
  _leds = []
  _data = 0
  _shadow

  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = STYLE

    this._shadow.appendChild(style)

    const section = document.createElement('section')
    this._leds = Array.from({ length: 28 }, () => document.createElement('div'))

    this._leds.forEach((led) => {
      led.classList.add('led')
      section.appendChild(led)
    })

    this._shadow.appendChild(section)
  }

  get data() {
    return this._data
  }

  set data(value) {
    this._data = value
    this.render()
  }

  static get observedAttributes() {
    return ['data']
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data') {
      this.data = JSON.parse(newValue)
    }
  }

  connectedCallback() {
    this.render()
  }

  render() {
    NUMBERS[this.data].forEach((val, idx) => {
      if (val === 1) {
        this._leds[idx].classList.add('active')
      } else {
        this._leds[idx].classList.remove('active')
      }
    })
  }
}

customElements.define('number-screen', NumberScreen)
