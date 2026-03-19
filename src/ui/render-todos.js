import { todoList } from "../data/todo-list.js";

export function renderTodoList() {
  let renderHtml = "";

  todoList.forEach(({ name, date, id, completed }) => {
    const isChecked = completed ? "checked" : "";

    renderHtml += `
          <div class="todo-item">
            <div class="completed-msg">Completed!</div>
            <input type="checkbox" class="todo-checkbox check-box" data-id="${id}" ${isChecked} />
            <div>${name}</div>
            <div>${date}</div>
            <button class="delete-btn" data-id="${id}">Delete</button>
          </div> 
         `;
  });

  document.querySelector(".todo-list").innerHTML = renderHtml;
}
