import { IProject } from "../domain/project";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";
import { CurrentProjectSwitcher } from "./current-project-switcher";

export class ProjectUnarchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter
  ) {}

  public async unarchive(project: IProject) {
    if (!project.archived) {
      throw new Error("project not archived");
    }

    project = { ...project, archived: false };

    await this.projectRepository.update(project);
    await this.currentProjectSwitcher.switch(project);
    this.projectPresenter.presentProjects(await this.projectRepository.list());
    this.projectPresenter.presentArchivedProjects(
      await this.projectRepository.listArchived()
    );
  }
}
