import { IProject } from "../domain/project";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";
import { IConfirmationController } from "./confirmation-controller";

export class ProjectDeleter {
  constructor(
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async delete(project: IProject) {
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
