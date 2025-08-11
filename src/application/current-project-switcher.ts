import type { Project } from "../domain/project.js";
import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { ProjectPresenter } from "./project-presenter.js";

export class CurrentProjectSwitcher {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly projectPresenter: ProjectPresenter;

  constructor(
    currentProjectRepository: CurrentProjectRepository,
    projectPresenter: ProjectPresenter,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.projectPresenter = projectPresenter;
  }

  public async switch(project: Project): Promise<void> {
    this.projectPresenter.presentCurrentProject(project);
    await this.currentProjectRepository.set(project.id);
  }
}
