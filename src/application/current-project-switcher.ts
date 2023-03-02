import { type IProject } from "../domain/project.js";
import { type ICurrentProjectRepository } from "./current-project-repository.js";
import { type DoneTaskLister } from "./done-task-lister.js";
import { type IDoneTaskPresenter } from "./done-task-presenter.js";
import { type IProjectPresenter } from "./project-presenter.js";
import { type TodoTaskLister } from "./todo-task-lister.js";
import { type ITodoTaskPresenter } from "./todo-task-presenter.js";

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
