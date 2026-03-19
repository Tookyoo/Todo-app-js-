import { todoList } from "./todo-list.js";

export function saveToStorage() {
  localStorage.setItem("todoList1", JSON.stringify(todoList));
}
