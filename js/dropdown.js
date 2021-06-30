let dropdowns = [];

function toggleDropdown (dropdown) {
  if (dropdown) dropdown.classList.toggle('visible')
}

function getValidTopElementByValidator (
  validator,
  startNode,
  maxDepth,
  depth = 0
) {
  if (depth >= maxDepth || !startNode) return null
  if (validator(startNode)) return startNode
  return getValidTopElementByValidator(
    validator,
    startNode.parentNode,
    maxDepth,
    ++depth
  )
}

function createElement (tagName, parentNode, className, textContent = null) {
  const element = document.createElement(tagName)
  element.className = className
  element.textContent = textContent
  parentNode.appendChild(element)
  return element
}

function getDropdowns () {
  return document.querySelectorAll('.drop-down')
}

function getVisibleDropdowns () {
  return document.querySelectorAll('.drop-down.visible')
}

function getVisibleDropdownByTarget (target) {
  return getValidTopElementByValidator(
    element => element.className === 'drop-down visible',
    target,
    4
  )
}

function listenDropdown (dropdown) {
  if(dropdowns.includes(dropdown)) return
  
  const dropdownButton = dropdown.querySelector('.drop-down-button')
  if (dropdownButton) {
    dropdownButton.addEventListener(
      'click',
      toggleDropdown.bind(this, dropdown)
    )
    dropdowns.push(dropdown)
  }
}

function addEventToItems (event, items, callback) {
  for (const item of items) {
    item.addEventListener(event, callback)
  }
}

const Dropdown = (buttonText, parentNode, items = []) => {
  let dropdownDOM, buttonDOM, contentDOM

  function _build () {
    dropdownDOM = createElement('div', parentNode, 'drop-down')
    buttonDOM = createElement(
      'button',
      dropdownDOM,
      'drop-down-button',
      buttonText
    )
    contentDOM = createElement('ul', dropdownDOM, 'drop-down-content')
    for (const item of items) {
      addItem(item)
    }
    listenDropdown(dropdownDOM)
  }

  function getDropdownDOM () {
    return dropdownDOM
  }

  function getContentDOM () {
    return contentDOM
  }

  function getButtonDOM () {
    return buttonDOM
  }

  function getItems () {
    return dropdownDOM.querySelectorAll('.drop-down-item')
  }

  function addItem (text) {
    return createElement('li', contentDOM, 'drop-down-item', text)
  }

  function removeItemByText (text) {
    const items = [...getItems()].filter(item => item.textContent === text)
    items.forEach(item => item.remove())
  }

  function removeItemByIndex (index) {
    const item = [...getItems()][index]
    if (item) item.remove()
  }

  _build()
  return {
    getDropdownDOM,
    getContentDOM,
    getButtonDOM,
    getItems,
    addItem,
    removeItemByText,
    removeItemByIndex,
    addEventToItems
  }
}

const ClickoutDropdown = (() => {
  // This will auto close all non-target dropdowns
  function clickoutListener (event) {
    const target = event.target
    const targetdropdown = getVisibleDropdownByTarget(target)
    for (const visibledropdown of getVisibleDropdowns()) {
      if (targetdropdown !== visibledropdown) toggleDropdown(visibledropdown)
    }
  }

  function listen () {
    window.addEventListener('click', clickoutListener)
  }

  function removeListener () {
    window.removeEventListener('click', clickoutListener)
  }
  return { listen, removeListener }
})()

// This will scan and add listener to all HTML dropdowns.
function setupHTMLDropdowns () {
  for (const dropdown of getDropdowns()) {
    listenDropdown(dropdown)
  }
}

export {
  setupHTMLDropdowns,
  getDropdowns,
  getVisibleDropdowns,
  ClickoutDropdown,
  Dropdown
}
