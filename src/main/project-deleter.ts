import { ProjectDeleter } from "../application/project-deleter.js";
import { confirmationController } from "./confirmation-controller.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const projectDeleter = new ProjectDeleter(
  projectRepository,
  projectPresenter,
  confirmationController,
);
