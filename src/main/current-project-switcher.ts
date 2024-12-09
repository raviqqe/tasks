import { CurrentProjectSwitcher } from "../application/current-project-switcher.js";
import { currentProjectRepository } from "./current-project-repository.js";
import { doneTaskLister } from "./done-task-lister.js";
import { doneTaskPresenter } from "./done-task-presenter.js";
import { projectPresenter } from "./project-presenter.js";
import { todoTaskLister } from "./todo-task-lister.js";
import { todoTaskPresenter } from "./todo-task-presenter.js";

export const currentProjectSwitcher = new CurrentProjectSwitcher(
  currentProjectRepository,
  projectPresenter,
  todoTaskLister,
  doneTaskLister,
  todoTaskPresenter,
  doneTaskPresenter,
);
