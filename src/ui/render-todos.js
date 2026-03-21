import { todoList, appState } from "../data/todo-list.js";

export function renderTodoList() {
  const root = document.querySelector(".todo-list");

  root.innerHTML = todoList
    .map(({ name, date, id, completed }) => {
      const isCheck = completed ? "checked" : "";
      const isActive = appState.activeIds[id] ? "active" : "";

      return `
      <div class="todo-item" data-id="${id}">
            <div class="completed-msg ${isActive}" data-id="${id}">Done!</div>
            <input type="checkbox" class="todo-checkbox check-box" data-id="${id}" ${isCheck}/>
            <div>${name}</div>
            <div>${date}</div>
            <button class="delete-btn" data-id="${id}">Delete</button>
          </div> 
      `;
    })
    .join("");
}
