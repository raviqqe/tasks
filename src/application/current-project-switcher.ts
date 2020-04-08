import { IProject } from "../domain/project";
import { ICurrentProjectRepository } from "./current-project-repository";
import { DoneTaskLister } from "./done-task-lister";
import { IDoneTaskPresenter } from "./done-task-presenter";
import { IProjectPresenter } from "./project-presenter";
import { TodoTaskLister } from "./todo-task-lister";
import { ITodoTaskPresenter } from "./todo-task-presenter";

export class CurrentProjectSwitcher {
  constructor(
    private readonly currentProjectRepository: ICurrentProjectRepository,
    private readonly projectPresenter: IProjectPresenter,
    private readonly todoTaskLister: TodoTaskLister,
    private readonly doneTaskLister: DoneTaskLister,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async switch(project: IProject): Promise<void> {
    this.todoTaskPresenter.presentTasks(null);
    this.doneTaskPresenter.presentTasks(null);

    this.projectPresenter.presentCurrentProject(project);
    await this.currentProjectRepository.set(project.id);
    await this.todoTaskLister.list(project.id);
    await this.doneTaskLister.list(project.id);
  }
}
