import { TodoTaskReorderer } from "../application/todo-task-reorderer.js";
import { currentProjectRepository } from "./current-project-repository.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";
import { todoTaskRepository } from "./todo-task-repository.js";

export const todoTaskReorderer = new TodoTaskReorderer(
  currentProjectRepository,
  todoTaskRepository,
  todoTaskPresenter,
);
