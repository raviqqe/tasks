import { formatErrorMessage } from "../domain/error";
import { IProject, getFirstProject } from "../domain/project";
import { IConfirmationController } from "./confirmation-controller";
import { CurrentProjectSwitcher } from "./current-project-switcher";
import { IMessagePresenter } from "./message-presenter";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";

export class ProjectArchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async archive(
    project: IProject,
    currentProjectId: string
  ): Promise<void> {
    if (project.archived) {
      throw new Error("project archived already");
    } else if ((await this.projectRepository.list()).length === 1) {
      this.messagePresenter.present(
        formatErrorMessage(new Error("cannot archive the last project"))
      );
      return;
    } else if (
      !(await this.confirmationController.confirm(
        `Archive the "${project.name}" project?`
      ))
    ) {
      return;
    }

    project = { ...project, archived: true };

    this.projectPresenter.presentArchivedProject(project);
    await this.projectRepository.update(project);

    if (project.id === currentProjectId) {
      await this.currentProjectSwitcher.switch(
        getFirstProject(await this.projectRepository.list())
      );
    }
  }
}
