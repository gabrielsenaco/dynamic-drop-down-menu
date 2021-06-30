# Dynamic Dropdown menu
Create dropdown menus and listen to static (HTML) and dynamic dropdown menus

## Install
```bash
npm i dynamic-drop-down-menu
```

## Usage
1. Import components that you should use.

```javascript
import {
  Dropdown,
  ClickoutDropdown,
  setupHTMLDropdowns
} from 'dynamic-drop-down-menu'
```

2. (Optional) Import css file: **css/dropdown.css**
(If you wanna test, you can import the css file in node_modules)

3. Try!
```javascript
// Creating dropdown
const dropdownRemove = Dropdown('Remove file', document.body, ['strings.txt', 'documents.txt', 'players.txt', 'users.json'])

// Adding event to dropdown items
dropdownRemove.addEventToItems('click', dropdownRemove.getItems(), (event) => {
  const confirmation = confirm(`You wanna remove ${event.target.textContent} file?`)
  if (confirmation) {
    event.target.remove()
    alert('File deleted!')
  }
})

// Auto close visible dropdown when clicks out.
ClickoutDropdown.listen()

// Loads all HTML dropdowns
setupHTMLDropdowns()
```

## Components

| Name                | Description                                                                  | Example                                         |
|---------------------|------------------------------------------------------------------------------|-------------------------------------------------|
| Dropdown            | Creates new dropdown element                                                 | Dropdown("Button name", parentNode, itemsArray) |
| ClickoutDropdown    | Module Pattern that control what happens when click out of visible dropdown  | ClickoutDropdown.listen()                       |
| setupHTMLDropdowns  | Loads all HTML dropdowns                                                     | setupHTMLDropdowns()                            |
| getDropdowns        | Return a list of all dropdowns                                               | getDropdowns()                                  |
| getVisibleDropdowns | Return a list of all visible dropdowns                                       | getVisibleDropdowns()                           |

### Dropdown components

| Name              | Description                                   | Example                                                                                                                       |
|-------------------|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| getDropdownDOM    | Returns dropdown element                      | dropdown.getDropdownDOM()                                                                                                     |
| getContentDOM     | Return dropdown content                       | dropdown.getContentDOM()                                                                                                      |
| getButtonDOM      | Return dropdown button                        | dropdown.getButtonDOM()                                                                                                       |
| getItems          | Return dropdown items                         | dropdown.getItems()                                                                                                           |
| addItem           | Add dropdown item by text                     | dropdown.addItem("Dropdown item 3")                                                                                           |
| removeItemByText  | Remove item by text                           | dropdown.removeItemByText("Dropdown item 3")                                                                                  |
| removeItemByIndex | Remove item by index                          | dropdown.removeItemByIndex(2)                                                                                                 |
| addEventToItems   | Add event listener to selected dropdown items | dropdown.addEventToItems("eventName", dropdown.getItems(), (event) => console.log(`You clicked ${event.target.textContent`})) |

## HTML Dropdown
You can create dropdown on HTML. See how:

1. Create dropdown on HTML

```html
<div class="drop-down">
  <button class="drop-down-button">Dropdown button</button>
  <ul class="drop-down-content">
    <li class="drop-down-item">Dropdown item 1></li>
    <li class="drop-down-item">Dropdown item 2</li>
    <li class="drop-down-item">Dropdown item 3</li>
  </ul>
</div>
```

2. Enable dropdown listener using **setupHTMLDropdowns**

```javascript
import {setupHTMLDropdowns} from 'dynamic-drop-down-menu'
setupHTMLDropdowns()
```

## The Odin Project
This is a project to how publish package on npm.