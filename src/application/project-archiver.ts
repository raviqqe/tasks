import { IProject } from "../domain/project";
import { formatErrorMessage } from "../domain/error";
import { IProjectRepository } from "./project-repository";
import { IProjectPresenter } from "./project-presenter";
import { IMessagePresenter } from "./message-presenter";
import { CurrentProjectSwitcher } from "./current-project-switcher";

export class ProjectArchiver {
  constructor(
    private readonly currentProjectSwitcher: CurrentProjectSwitcher,
    private readonly projectRepository: IProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async archive(project: IProject) {
    if (project.archived) {
      throw new Error("project archived already");
    } else if ((await this.projectRepository.list()).length === 1) {
      this.messagePresenter.present(
        formatErrorMessage(new Error("cannot archive the last project"))
      );
      return;
    }

    await this.projectRepository.update({ ...project, archived: true });

    const projects = await this.projectRepository.list();

    await this.currentProjectSwitcher.switch(projects[0]);
    this.projectPresenter.presentProjects(projects);
    this.projectPresenter.presentArchivedProjects(
      await this.projectRepository.listArchived()
    );
  }
}
