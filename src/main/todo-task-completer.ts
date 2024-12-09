import { TodoTaskCompleter } from "../application/todo-task-completer.js";
import { doneTaskPresenter } from "./done-task-presenter.js";
import { doneTaskRepository } from "./done-task-repository.js";
import { todoTaskDeleter } from "./todo-task-deleter.js";

export const todoTaskCompleter = new TodoTaskCompleter(
  todoTaskDeleter,
  doneTaskRepository,
  doneTaskPresenter,
);
