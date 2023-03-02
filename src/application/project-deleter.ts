import { type IProject } from "../domain/project.js";
import { type IConfirmationController } from "./confirmation-controller.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type IProjectRepository } from "./project-repository.js";

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
