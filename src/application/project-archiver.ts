import { formatErrorMessage } from "../domain/error.js";
import { type IProject, getFirstProject } from "../domain/project.js";
import { type IConfirmationController } from "./confirmation-controller.js";
import { type CurrentProjectSwitcher } from "./current-project-switcher.js";
import { type IMessagePresenter } from "./message-presenter.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type IProjectRepository } from "./project-repository.js";

export class ProjectArchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter,
    private readonly confirmationController: IConfirmationController,
  ) {}

  public async archive(
    project: IProject,
    currentProjectId: string,
  ): Promise<void> {
    if (project.archived) {
      throw new Error("project archived already");
    } else if ((await this.projectRepository.list()).length === 1) {
      this.messagePresenter.present(
        formatErrorMessage(new Error("cannot archive the last project")),
      );
      return;
    } else if (
      !(await this.confirmationController.confirm(
        `Archive the "${project.name}" project?`,
      ))
    ) {
      return;
    }

    project = { ...project, archived: true };

    this.projectPresenter.presentArchivedProject(project);
    await this.projectRepository.update(project);

    if (project.id === currentProjectId) {
      await this.currentProjectSwitcher.switch(
        getFirstProject(await this.projectRepository.list()),
      );
    }
  }
}
