import { formatErrorMessage } from "../domain/error.js";
import {
  formatProject,
  type Project,
  validateProject,
} from "../domain/project.js";
import { type MessagePresenter } from "./message-presenter.js";
import { type ProjectPresenter } from "./project-presenter.js";
import { type ProjectRepository } from "./project-repository.js";

export class ProjectUpdater {
  private readonly projectRepository: ProjectRepository;
  private readonly projectPresenter: ProjectPresenter;
  private readonly messagePresenter: MessagePresenter;

  constructor(
    projectRepository: ProjectRepository,
    projectPresenter: ProjectPresenter,
    messagePresenter: MessagePresenter,
  ) {
    this.projectRepository = projectRepository;
    this.projectPresenter = projectPresenter;
    this.messagePresenter = messagePresenter;
  }

  public async update(project: Project): Promise<void> {
    project = formatProject(project);

    try {
      validateProject(project);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.projectPresenter.presentUpdatedProject(project);
    await this.projectRepository.update(project);
  }
}
