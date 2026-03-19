import { renderTodoList } from "../ui/render-todos.js";
import {
  setupAddTodoListener,
  completeListener,
  eventKeydown,
} from "../component/add-todo.js";
import { deleteTodo } from "../component/delete-todo.js";

renderTodoList();
setupAddTodoListener();
completeListener();
deleteTodo();
eventKeydown();
