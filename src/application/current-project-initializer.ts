import { getFirstProject } from "../domain/project.js";
import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { CurrentProjectSwitcher } from "./current-project-switcher.js";
import type { ProjectCreator } from "./project-creator.js";
import type { ProjectPresenter } from "./project-presenter.js";
import type { ProjectRepository } from "./project-repository.js";

const defaultProjectName = "main";

export class CurrentProjectInitializer {
  private readonly projectCreator: ProjectCreator;
  private readonly projectRepository: ProjectRepository;
  private readonly projectPresenter: ProjectPresenter;
  private readonly currentProjectSwitcher: CurrentProjectSwitcher;
  private readonly currentProjectRepository: CurrentProjectRepository;

  constructor(
    projectCreator: ProjectCreator,
    projectRepository: ProjectRepository,
    projectPresenter: ProjectPresenter,
    currentProjectSwitcher: CurrentProjectSwitcher,
    currentProjectRepository: CurrentProjectRepository,
  ) {
    this.projectCreator = projectCreator;
    this.projectRepository = projectRepository;
    this.projectPresenter = projectPresenter;
    this.currentProjectSwitcher = currentProjectSwitcher;
    this.currentProjectRepository = currentProjectRepository;
  }

  public async initialize(): Promise<void> {
    const projects = await this.projectRepository.list();

    if (!projects.length) {
      await this.projectCreator.create(defaultProjectName);
      return;
    }

    const projectId = await this.currentProjectRepository.get();

    await this.currentProjectSwitcher.switch(
      projects.find((project) => project.id === projectId) ??
        getFirstProject(projects),
    );
    this.projectPresenter.presentProjects(projects);
    this.projectPresenter.presentArchivedProjects(
      await this.projectRepository.listArchived(),
    );
  }
}
