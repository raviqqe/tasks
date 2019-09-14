import UUID from "pure-uuid";
import { IProject, formatProject, validateProject } from "../domain/project";
import { formatErrorMessage } from "../domain/error";
import { IProjectPresenter } from "./project-presenter";
import { IProjectRepository } from "./project-repository";
import { IMessagePresenter } from "./message-presenter";
import { CurrentProjectSwitcher } from "./current-project-switcher";

export class ProjectCreator {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(name: string): Promise<void> {
    const project: IProject = formatProject({
      id: new UUID(4).toString(),
      name
    });

    try {
      validateProject(project);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.projectRepository.create(project);
    await this.currentProjectSwitcher.switch(project);
    this.projectPresenter.presentProjects(await this.projectRepository.list());
  }
}
