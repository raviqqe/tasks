import { TodoTaskDeleter } from "../application/todo-task-deleter.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";
import { todoTaskRepository } from "./todo-task-repository.js";

export const todoTaskDeleter = new TodoTaskDeleter(
  todoTaskRepository,
  todoTaskPresenter,
);
