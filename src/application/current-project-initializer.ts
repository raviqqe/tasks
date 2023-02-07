import { getFirstProject } from "../domain/project";
import { ICurrentProjectRepository } from "./current-project-repository";
import { CurrentProjectSwitcher } from "./current-project-switcher";
import { ProjectCreator } from "./project-creator";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";

const defaultProjectName = "main";

export class CurrentProjectInitializer {
  constructor(
    private readonly projectCreator: ProjectCreator,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly currentProjectRepository: ICurrentProjectRepository
  ) {}

  public async initialize(): Promise<void> {
    const projects = await this.projectRepository.list();

    if (!projects.length) {
      await this.projectCreator.create(defaultProjectName);
      return;
    }

    const projectId = await this.currentProjectRepository.get();

    await this.currentProjectSwitcher.switch(
      projects.find((project) => project.id === projectId) ??
        getFirstProject(projects)
    );
    this.projectPresenter.presentProjects(projects);
    this.projectPresenter.presentArchivedProjects(
      await this.projectRepository.listArchived()
    );
  }
}
