import { type Project } from "../domain/project.js";
import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type DoneTaskLister } from "./done-task-lister.js";
import { type DoneTaskPresenter } from "./done-task-presenter.js";
import { type ProjectPresenter } from "./project-presenter.js";
import { type TodoTaskLister } from "./todo-task-lister.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";

export class CurrentProjectSwitcher {
  constructor(
    private readonly currentProjectRepository: CurrentProjectRepository,
    private readonly projectPresenter: ProjectPresenter,
    private readonly todoTaskLister: TodoTaskLister,
    private readonly doneTaskLister: DoneTaskLister,
    private readonly todoTaskPresenter: TodoTaskPresenter,
    private readonly doneTaskPresenter: DoneTaskPresenter,
  ) {}

  public async switch(project: Project): Promise<void> {
    this.todoTaskPresenter.presentTasks(null);
    this.doneTaskPresenter.presentTasks(null);

    this.projectPresenter.presentCurrentProject(project);
    await this.currentProjectRepository.set(project.id);
    await this.todoTaskLister.list(project.id);
    await this.doneTaskLister.list(project.id);
  }
}
