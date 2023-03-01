import { formatErrorMessage } from "../domain/error.js";
import { IProject, validateProject, formatProject } from "../domain/project.js";
import { IMessagePresenter } from "./message-presenter.js";
import { IProjectPresenter } from "./project-presenter.js";
import { IProjectRepository } from "./project-repository.js";

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
