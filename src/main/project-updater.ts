import { ProjectUpdater } from "../application/project-updater.js";
import { messagePresenter } from "./message-presenter.js";
import { projectPresenter } from "./project-presenter.js";
import { projectRepository } from "./project-repository.js";

export const projectUpdater = new ProjectUpdater(
  projectRepository,
  projectPresenter,
  messagePresenter,
);
