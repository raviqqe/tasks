import { ProjectCreator } from "../application/project-creator.js";
import { currentProjectSwitcher } from "./current-project-switcher.js";
import { messagePresenter } from "./messange-presenter.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const projectCreator = new ProjectCreator(
  currentProjectSwitcher,
  projectRepository,
  projectPresenter,
  messagePresenter,
);
