import { ProjectArchiver } from "../application/project-archiver.js";
import { confirmationController } from "./confirmation-controller.js";
import { currentProjectSwitcher } from "./current-project-switcher.js";
import { messagePresenter } from "./message-presenter.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const projectArchiver = new ProjectArchiver(
  currentProjectSwitcher,
  projectRepository,
  projectPresenter,
  messagePresenter,
  confirmationController,
);
