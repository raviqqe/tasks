import { TodoTaskCompleter } from "../application/todo-task-completer.js";
import { currentProjectRepository } from "./current-project-repository.js";
import { doneTaskPresenter } from "./done-task-presenter.js";
import { doneTaskRepository } from "./done-task-repository.js";
import { todoTaskDeleter } from "./todo-task-deleter.js";

export const todoTaskCompleter = new TodoTaskCompleter(
  currentProjectRepository,
  todoTaskDeleter,
  doneTaskRepository,
  doneTaskPresenter,
);
