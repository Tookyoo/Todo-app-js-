import { removeTodo } from "../data/todo-list.js";
import { renderTodoList } from "../ui/render-todos.js";
import { saveToStorage } from "../data/save-storage.js";

export function deleteTodo() {
  const listContainer = document.querySelector(".todo-list");

  listContainer.onclick = (e) => {
    const target = e.target;
    const delBtn = target.closest(".delete-btn");

    if (delBtn) {
      const id = delBtn.dataset.id;

      removeTodo(id);
      saveToStorage();
      renderTodoList();
    }
  };
}
