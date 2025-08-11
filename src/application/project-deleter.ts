import type { Project } from "../domain/project.js";
import type { ConfirmationController } from "./confirmation-controller.js";
import type { ProjectPresenter } from "./project-presenter.js";
import type { ProjectRepository } from "./project-repository.js";

export class ProjectDeleter {
  private readonly projectRepository: ProjectRepository;
  private readonly projectPresenter: ProjectPresenter;
  private readonly confirmationController: ConfirmationController;

  constructor(
    projectRepository: ProjectRepository,
    projectPresenter: ProjectPresenter,
    confirmationController: ConfirmationController,
  ) {
    this.projectRepository = projectRepository;
    this.projectPresenter = projectPresenter;
    this.confirmationController = confirmationController;
  }

  public async delete(project: Project): Promise<void> {
    if (!project.archived) {
      throw new Error("project not archived");
    } else if (
      !(await this.confirmationController.confirm(
        `Delete the "${project.name}" project?`,
      ))
    ) {
      return;
    }

    this.projectPresenter.presentDeletedProject(project.id);
    await this.projectRepository.delete(project.id);
  }
}
