import { todoList, removeTodo } from "../data/todo-list.js";
import { renderTodoList } from "../ui/render-todos.js";
import { saveToStorage } from "../data/save-storage.js";

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

  const newtodo = {
    id: crypto.randomUUID(),
    name,
    date,
    completed: false,
  };

  todoList.push(newtodo);
  saveToStorage();
  renderTodoList();
  nameInput.value = "";
  dateInput.value = "";
}

export function completeTodo(id) {
  const todo = todoList.find((todo) => String(todo.id) === String(id));

  if (todo) {
    todo.completed = !todo.completed;
    saveToStorage();
  }

  renderTodoList();

  if (todo.completed) {
    const currentTodoItem = document
      .querySelector(`[data-id="${id}"]`)
      .closest(".todo-item");
    const completedMsg = currentTodoItem.querySelector(".completed-msg");

    if (completedMsg) {
      completedMsg.classList.add("active");
      setTimeout(() => {
        completedMsg.classList.remove("active");
      }, 1000);
    }
  }
}

export function setupDelegateListener() {
  const listContainer = document.querySelector(".todo-list");
  const formContainer = document.querySelector(".todo-form");

  listContainer.addEventListener("click", (event) => {
    const target = event.target;
    const btn = target.closest(".delete-btn");

    if (btn) {
      const id = btn.dataset.id;
      removeTodo(id);
    }
  });

  listContainer.addEventListener("change", (event) => {
    const target = event.target;

    if (target.classList.contains("todo-checkbox")) {
      const id = target.dataset.id;
      completeTodo(id, target.checked);
    }
  });

  formContainer.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodo();
    }
  });

  document.querySelector(".add-btn").addEventListener("click", addTodo);
}
