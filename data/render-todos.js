import { todoList } from "./todo-list.js";
import { saveToStorage } from "./saveToStorage.js";

export function renderTodoList() {
  let renderHtml = "";

  todoList.forEach(({ name, date }, index) => {
    renderHtml += `
      <div class="todo-item">
            <div>${name}</div>
            <div>${date}</div>
             <button class="delete-btn" data-index="${index}">Delete</button>
                  
                  </div>
        
         `;
  });

  document.querySelector(".todo-list").innerHTML = renderHtml;

  document.querySelectorAll(".delete-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      todoList.splice(index, 1);
      renderTodoList();
      saveToStorage();
    });
  });
}
