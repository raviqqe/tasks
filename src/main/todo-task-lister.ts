import { TodoTaskLister } from "../application/todo-task-lister.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";
import { todoTaskRepository } from "./todo-task-repository.js";

export const todoTaskLister = new TodoTaskLister(
  todoTaskRepository,
  todoTaskPresenter,
);
