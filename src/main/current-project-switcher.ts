import { CurrentProjectSwitcher } from "../application/current-project-switcher.js";
import { currentProjectRepository } from "./current-project-repository.js";
import { projectPresenter } from "./project-presenter.js";

export const currentProjectSwitcher = new CurrentProjectSwitcher(
  currentProjectRepository,
  projectPresenter,
);
