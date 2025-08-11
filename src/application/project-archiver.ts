import { formatErrorMessage } from "../domain/error.js";
import { getFirstProject, type Project } from "../domain/project.js";
import type { ConfirmationController } from "./confirmation-controller.js";
import type { CurrentProjectSwitcher } from "./current-project-switcher.js";
import type { MessagePresenter } from "./message-presenter.js";
import type { ProjectPresenter } from "./project-presenter.js";
import type { ProjectRepository } from "./project-repository.js";

export class ProjectArchiver {
  private readonly currentProjectSwitcher: CurrentProjectSwitcher;
  private readonly projectRepository: ProjectRepository;
  private readonly projectPresenter: ProjectPresenter;
  private readonly messagePresenter: MessagePresenter;
  private readonly confirmationController: ConfirmationController;

  public constructor(
    currentProjectSwitcher: CurrentProjectSwitcher,
    projectRepository: ProjectRepository,
    projectPresenter: ProjectPresenter,
    messagePresenter: MessagePresenter,
    confirmationController: ConfirmationController,
  ) {
    this.currentProjectSwitcher = currentProjectSwitcher;
    this.projectRepository = projectRepository;
    this.projectPresenter = projectPresenter;
    this.messagePresenter = messagePresenter;
    this.confirmationController = confirmationController;
  }

  public async archive(
    project: Project,
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
