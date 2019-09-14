import { IProject } from "../domain/project";
import { ICurrentProjectRepository } from "./current-project-repository";
import { IProjectPresenter } from "./project-presenter";
import { TodoTaskLister } from "./todo-task-lister";

export class CurrentProjectSwitcher {
  constructor(
    private readonly currentProjectRepository: ICurrentProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly todoTaskLister: TodoTaskLister
  ) {}

  public async switch(project: IProject): Promise<void> {
    await this.projectPresenter.presentCurrentProject(project);
    await this.currentProjectRepository.set(project.id);
    await this.todoTaskLister.list(project.id);
  }
}
