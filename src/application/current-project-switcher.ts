import { IProject } from "../domain/project";
import { ICurrentProjectRepository } from "./current-project-repository";
import { IProjectPresenter } from "./project-presenter";
import { TodoTaskLister } from "./todo-task-lister";
import { DoneTaskLister } from "./done-task-lister";

export class CurrentProjectSwitcher {
  constructor(
    private readonly currentProjectRepository: ICurrentProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly todoTaskLister: TodoTaskLister,
    private readonly doneTaskLister: DoneTaskLister
  ) {}

  public async switch(project: IProject): Promise<void> {
    this.projectPresenter.presentCurrentProject(project);
    await this.currentProjectRepository.set(project.id);
    await this.todoTaskLister.list(project.id);
    await this.doneTaskLister.list(project.id);
  }
}
