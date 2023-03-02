import { formatErrorMessage } from "../domain/error.js";
import {
  type IProject,
  validateProject,
  formatProject,
} from "../domain/project.js";
import { type IMessagePresenter } from "./message-presenter.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type IProjectRepository } from "./project-repository.js";

export class ProjectUpdater {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(project: IProject): Promise<void> {
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
