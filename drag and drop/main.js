const data = ['a', 'b', 'c']

const $ = (tag) => document.querySelector(tag)

const groupOne = $('#group-1')
const groupTwo = $('#group-2')

data.forEach((l) => {
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerText = 'Card ' + l
  card.setAttribute('draggable', true)
  groupOne.appendChild(card)
})

let draggedElement = null

groupOne.addEventListener('dragstart', (e) => {
  if (e.target && e.target.classList.contains('card')) {
    draggedElement = e.target
    e.target.classList.add('dragging')
    e.dataTransfer.effectAllowed = 'move'
  }
})

groupOne.addEventListener('dragend', (e) => {
  if (e.target && e.target.classList.contains('card')) {
    e.target.classList.remove('dragging')
    draggedElement = null
  }
})

groupOne.addEventListener('dragover', (e) => {
  e.preventDefault()
  const afterElement = getDragAfterElement(groupOne, e.clientY)
  if (afterElement == null) {
    groupOne.appendChild(draggedElement)
  } else {
    groupOne.insertBefore(draggedElement, afterElement)
  }
})

function getDragAfterElement(groupOne, y) {
  const draggableElements = [
    ...groupOne.querySelectorAll('.card:not(.dragging)'),
  ]

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child }
      } else {
        return closest
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element
}
