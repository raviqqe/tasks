import { TodoTaskCreator } from "../application/todo-task-creator.js";
import { messagePresenter } from "./message-presenter.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";
import { todoTaskRepository } from "./todo-task-repository.js";

export const todoTaskCreator = new TodoTaskCreator(
  todoTaskRepository,
  todoTaskPresenter,
  messagePresenter,
);
