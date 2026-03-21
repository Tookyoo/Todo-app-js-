import { removeTodo, todoList, appState } from "../data/todo-list.js";
import { renderTodoList } from "../ui/render-todos.js";
import { saveToStorage } from "../data/save-storage.js";
import { renderPage } from "../ui/render-page.js";

function setAdded(value) {
  appState.isAddedActive = value;
  renderPage();
}

export function addTodo() {
  let nameInput = document.querySelector(".todo-input");
  let dateInput = document.querySelector(".todo-date");

  const name = nameInput.value.trim();
  const date = dateInput.value;

  if (todoList.some((todo) => todo.name === name)) {
    return alert("Todo with this name already exists!");
  }

  if (!name || !date) {
    return alert("Please fill in both fields!");
  }

  setAdded(true);
  setTimeout(() => {
    setAdded(false);
  }, 1500);

  const newTodo = {
    id: crypto.randomUUID(),
    name,
    date,
    completed: false,
  };

  todoList.push(newTodo);
  saveToStorage();
  renderTodoList();
  nameInput.value = "";
  dateInput.value = "";
}

function handleRemove(id) {
  removeTodo(id);
  renderTodoList();
}

export function setupDelegateListener() {
  const listContainer = document.querySelector(".todo-list");
  const formContainer = document.querySelector(".todo-form");

  formContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });

  listContainer.addEventListener("click", (e) => {
    const target = e.target;
    const delBtn = target.closest(".delete-btn");

    if (delBtn) {
      const id = target.dataset.id;
      handleRemove(id);
    }
  });

  listContainer.addEventListener("change", (e) => {
    const target = e.target;

    if (target.classList.contains("todo-checkbox")) {
      const id = target.dataset.id;
      completeTodo(id);
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) addTodo();
  });
}

function completeTodo(id) {
  const todo = todoList.find((todo) => String(todo.id) === String(id));
  let isActiveId = appState.activeIds[id];

  if (!todo) return;

  todo.completed = !todo.completed;

  if (todo.completed) {
    if (isActiveId) clearTimeout(isActiveId); // if its there, reset it

    isActiveId = true; // mark as active in our state record
    renderTodoList(); // shows the active class

    appState.activeIds[id] = setTimeout(() => {
      // stacking ids in the array

      delete appState.activeIds[id];
      renderTodoList();
    }, 1500);
  } else {
    clearTimeout(isActiveId);
    delete appState.activeIds[id];
  }
  saveToStorage();
  renderTodoList();
}
