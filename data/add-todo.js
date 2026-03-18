import { todoList } from "./todo-list.js";
import { renderTodoList } from "./render-todos.js";
import { saveToStorage } from "./saveToStorage.js";

export function addTodo() {
  let nameInput = document.querySelector(".todo-input");
  let dateInput = document.querySelector(".todo-date");

  const name = nameInput.value.trim();
  const date = dateInput.value;

  const addedMsg = document.querySelector(".added-msg");

  if (todoList.some((todo) => todo.name === name)) {
    return alert("Todo with this name already exists!");
  }

  if (!name || !date) {
    return alert("Please fill in both fields!");
  }

  if (addedMsg) {
    addedMsg.classList.add("active");

    const timeoutId = setTimeout(() => {
      addedMsg.classList.remove("active");
    }, 1000);
  }

  todoList.push({ name, date });
  renderTodoList();
  saveToStorage();
  nameInput.value = "";
  dateInput.value = "";
}

export function setupAddTodoListener() {
  document.querySelector(".add-btn").addEventListener("click", addTodo);
}
