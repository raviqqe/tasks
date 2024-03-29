import { type Project } from "../domain/project.js";
import { type CurrentProjectSwitcher } from "./current-project-switcher.js";
import { type ProjectPresenter } from "./project-presenter.js";
import { type ProjectRepository } from "./project-repository.js";

export class ProjectUnarchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: ProjectRepository,
    private readonly projectPresenter: ProjectPresenter,
  ) {}

  public async unarchive(project: Project): Promise<void> {
    if (!project.archived) {
      throw new Error("project not archived");
    }

    project = { ...project, archived: false };

    this.projectPresenter.presentUnarchivedProject(project);
    await this.currentProjectSwitcher.switch(project);
    await this.projectRepository.update(project);
  }
}
