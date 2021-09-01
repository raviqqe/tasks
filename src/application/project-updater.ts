import { formatErrorMessage } from "../domain/error";
import { IProject, validateProject, formatProject } from "../domain/project";
import { IMessagePresenter } from "./message-presenter";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";

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
