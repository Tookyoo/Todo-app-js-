import { saveToStorage } from "./save-storage.js";

export let todoList = JSON.parse(localStorage.getItem("todoList1")) || [];

export function removeTodo(idToRemove) {
  todoList = todoList.filter((todo) => String(todo.id) !== String(idToRemove));
  saveToStorage();
}
