import { ProjectUnarchiver } from "../application/project-unarchiver.js";
import { currentProjectSwitcher } from "./current-project-switcher.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const projectUnarchiver = new ProjectUnarchiver(
  currentProjectSwitcher,
  projectRepository,
  projectPresenter,
);
