import { renderTodoList } from "../ui/render-todos.js";
import { renderPage } from "../ui/render-page.js";
import { setupDelegateListener } from "../component/add-todo.js";

renderPage();
renderTodoList();
setupDelegateListener();
