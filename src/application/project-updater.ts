import { formatErrorMessage } from "../domain/error.js";
import {
  type Project,
  validateProject,
  formatProject,
} from "../domain/project.js";
import { type MessagePresenter } from "./message-presenter.js";
import { type ProjectPresenter } from "./project-presenter.js";
import { type ProjectRepository } from "./project-repository.js";

export class ProjectUpdater {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectPresenter: ProjectPresenter,
    private readonly messagePresenter: MessagePresenter,
  ) {}

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
