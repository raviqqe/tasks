import UUID from "pure-uuid";
import { formatErrorMessage } from "../domain/error";
import { IProject, formatProject, validateProject } from "../domain/project";
import { CurrentProjectSwitcher } from "./current-project-switcher";
import { IMessagePresenter } from "./message-presenter";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";

export class ProjectCreator {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(name: string): Promise<void> {
    const project: IProject = formatProject({
      archived: false,
      id: new UUID(4).format(),
      name,
    });

    try {
      validateProject(project);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    await this.projectRepository.create(project);
    await this.currentProjectSwitcher.switch(project);
    this.projectPresenter.presentProjects(await this.projectRepository.list());
  }
}
