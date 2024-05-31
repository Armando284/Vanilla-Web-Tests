const container = document.querySelector('#container')
const buttonGroup = document.querySelector('.button-group')
const results = document.querySelector('#results')

const alph = 'abcdefghijklmnopqrstuvwxyz'

alph.split('').forEach((l) => {
  const button = document.createElement('button')
  button.innerText = l
  button.setAttribute('draggable', false)
  button.onclick = (e) => {
    e.stopPropagation()
    results.innerText = l
  }
  buttonGroup.appendChild(button)
})

const handleOnDown = (e) => (buttonGroup.dataset.mouseDownAt = e.clientX)

const handleOnUp = () => {
  buttonGroup.dataset.mouseDownAt = '0'
  buttonGroup.dataset.prevPercentage = buttonGroup.dataset.percentage
}

const handleOnMove = (e) => {
  if (buttonGroup.dataset.mouseDownAt === '0') return

  const mouseDelta = parseFloat(buttonGroup.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth // * reduce to increase speed

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(buttonGroup.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100)

  buttonGroup.dataset.percentage = nextPercentage

  buttonGroup.animate(
    {
      transform: `translate(${nextPercentage}%, 0)`,
    },
    { duration: 1200, fill: 'forwards' }
  )
}

container.onmousedown = (e) => handleOnDown(e)

container.ontouchstart = (e) => handleOnDown(e.touches[0])

container.onmouseup = (e) => handleOnUp(e)

container.ontouchend = (e) => handleOnUp(e.touches[0])

container.onmousemove = (e) => handleOnMove(e)

container.ontouchmove = (e) => handleOnMove(e.touches[0])
