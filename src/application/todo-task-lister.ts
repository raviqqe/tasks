import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskLister {
  constructor(
    private readonly currentProjectRepository: CurrentProjectRepository,
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
  ) {}

  public async list(): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Current project not defined");
    }

    this.todoTaskPresenter.presentTasks(null);
    this.todoTaskPresenter.presentTasks(
      await this.todoTaskRepository.list(projectId),
    );
  }
}
