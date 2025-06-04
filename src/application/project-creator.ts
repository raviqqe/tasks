import { formatErrorMessage } from "../domain/error.js";
import {
  formatProject,
  type Project,
  validateProject,
} from "../domain/project.js";
import { type CurrentProjectSwitcher } from "./current-project-switcher.js";
import { type MessagePresenter } from "./message-presenter.js";
import { type ProjectPresenter } from "./project-presenter.js";
import { type ProjectRepository } from "./project-repository.js";

export class ProjectCreator {
  private readonly currentProjectSwitcher: CurrentProjectSwitcher;
  private readonly projectRepository: ProjectRepository;
  private readonly projectPresenter: ProjectPresenter;
  private readonly messagePresenter: MessagePresenter;

  constructor(
    currentProjectSwitcher: CurrentProjectSwitcher,
    projectRepository: ProjectRepository,
    projectPresenter: ProjectPresenter,
    messagePresenter: MessagePresenter,
  ) {
    this.currentProjectSwitcher = currentProjectSwitcher;
    this.projectRepository = projectRepository;
    this.projectPresenter = projectPresenter;
    this.messagePresenter = messagePresenter;
  }

  public async create(name: string): Promise<void> {
    const project: Project = formatProject({
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
