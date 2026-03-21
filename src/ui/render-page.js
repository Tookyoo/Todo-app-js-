import { appState } from "../data/todo-list.js";

export function renderPage() {
  const root = document.querySelector(".root");

  root.innerHTML = `
    <h1>Todo App</h1>

      <div class="todo-form">
        <input
          type="text"
          class="todo-input"
          placeholder="Enter a new todo"
          required
        />
        <input type="date" class="todo-date" required />
        <div class="added-msg ${appState.isAddedActive ? "active" : ""}">Successfully added!</div>
        <button class="add-btn">Add Todo</button>
      </div>
   `;
}
