import { IProject, validateProject, formatProject } from "../domain/project";
import { formatErrorMessage } from "../domain/error";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";
import { IMessagePresenter } from "./message-presenter";

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
      this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    this.projectPresenter.presentUpdatedProject(project);
    await this.projectRepository.update(project);
  }
}
