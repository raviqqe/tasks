import { DoneTaskLister } from "../application/done-task-lister.js";
import { doneTaskPresenter } from "./done-task-presenter.js";
import { doneTaskRepository } from "./done-task-repository.js";

export const doneTaskLister = new DoneTaskLister(
  doneTaskRepository,
  doneTaskPresenter,
);
