import './numberScreen.js'

const STYLE = `
article {
  --responsive-size: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--responsive-size);
  header {
    h1{
      font-size: 48px;
    }
  }
  section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--responsive-size);
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--responsive-size);
    }
    span {
      font-size: 48px;
      font-weight: bold;
    }
  }
}

/* sm */
@media (min-width: 640px) {
  article{
    --responsive-size: 8px;
  }
}

/* md */
@media (min-width: 768px) {
  article{
    --responsive-size: 8px;
  }
}

/* lg */
@media (min-width: 1024px) {
  article{
    --responsive-size: 8px;
  }
}

/* xl */
@media (min-width: 1280px) {
  article{
    --responsive-size: 8px;
  }
}

/* 2xl */
@media (min-width: 1536px) {
  article{
    --responsive-size: 8px;
  }
}
`

class LedClock extends HTMLElement {
  _shadow

  constructor() {
    super()

    this._shadow = this.attachShadow({ mode: 'open' })

    const styles = document.createElement('style')

    styles.textContent = STYLE

    this._shadow.innerHTML = `
    <article>
      <header>
        <h1>CLOCK</h1>
      </header>
      <section>
        <div>
          <number-screen id="hour1"></number-screen>
          <number-screen id="hour2"></number-screen>
        </div>
        <span>:</span>
        <div>
          <number-screen id="minute1"></number-screen>
          <number-screen id="minute2"></number-screen>
        </div>
        <span>:</span>
        <div>
          <number-screen id="second1"></number-screen>
          <number-screen id="second2"></number-screen>
        </div>
      </section>
    </article>
    `

    this._shadow.appendChild(styles)

    const $ = (tag) => this._shadow.querySelector(tag)

    const hour1 = $('#hour1')
    const hour2 = $('#hour2')
    const minute1 = $('#minute1')
    const minute2 = $('#minute2')
    const second1 = $('#second1')
    const second2 = $('#second2')

    const setData = (component, value) => {
      component.setAttribute('data', value)
    }

    const format = (data) => {
      const val = data.toString()
      return val.length === 1 ? '0' + val : val
    }

    setInterval(() => {
      const time = new Date()
      const hour = format(time.getHours())
      const min = format(time.getMinutes())
      const sec = format(time.getSeconds())

      setData(hour1, hour[0])
      setData(hour2, hour[1])
      setData(minute1, min[0])
      setData(minute2, min[1])
      setData(second1, sec[0])
      setData(second2, sec[1])
    }, 1000)
  }
}

customElements.define('led-clock', LedClock)
