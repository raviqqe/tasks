import { formatErrorMessage } from "../domain/error.js";
import {
  type IProject,
  formatProject,
  validateProject,
} from "../domain/project.js";
import { type CurrentProjectSwitcher } from "./current-project-switcher.js";
import { type IMessagePresenter } from "./message-presenter.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type IProjectRepository } from "./project-repository.js";

export class ProjectCreator {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(name: string): Promise<void> {
    const project: IProject = formatProject({
      archived: false,
      id: window.crypto.randomUUID(),
      name,
    });

    try {
      validateProject(project);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    await this.projectRepository.create(project);
    await this.currentProjectSwitcher.switch(project);
    this.projectPresenter.presentProjects(await this.projectRepository.list());
  }
}
