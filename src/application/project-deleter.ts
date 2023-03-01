import { IProject } from "../domain/project.js";
import { IConfirmationController } from "./confirmation-controller.js";
import { IProjectPresenter } from "./project-presenter.js";
import { IProjectRepository } from "./project-repository.js";

export class ProjectDeleter {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async delete(project: IProject): Promise<void> {
    if (!project.archived) {
      throw new Error("project not archived");
    } else if (
      !(await this.confirmationController.confirm(
        `Delete the "${project.name}" project?`
      ))
    ) {
      return;
    }

    this.projectPresenter.presentDeletedProject(project.id);
    await this.projectRepository.delete(project.id);
  }
}
