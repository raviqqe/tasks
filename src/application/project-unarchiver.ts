import { IProject } from "../domain/project";
import { CurrentProjectSwitcher } from "./current-project-switcher";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";

export class ProjectUnarchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter
  ) {}

  public async unarchive(project: IProject): Promise<void> {
    if (!project.archived) {
      throw new Error("project not archived");
    }

    project = { ...project, archived: false };

    this.projectPresenter.presentUnarchivedProject(project);
    await this.currentProjectSwitcher.switch(project);
    await this.projectRepository.update(project);
  }
}
