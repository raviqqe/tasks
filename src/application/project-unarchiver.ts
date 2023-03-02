import { type IProject } from "../domain/project.js";
import { type CurrentProjectSwitcher } from "./current-project-switcher.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type IProjectRepository } from "./project-repository.js";

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
