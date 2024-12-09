import { CurrentProjectInitializer } from "../application/current-project-initializer.js";
import { currentProjectRepository } from "./current-project-repository.js";
import { currentProjectSwitcher } from "./current-project-switcher.js";
import { projectCreator } from "./project-creator.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const currentProjectInitializer = new CurrentProjectInitializer(
  projectCreator,
  projectRepository,
  projectPresenter,
  currentProjectSwitcher,
  currentProjectRepository,
);
