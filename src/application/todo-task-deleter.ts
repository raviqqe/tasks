import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskDeleter {
  constructor(
    private readonly currentProjectRepository: CurrentProjectRepository,
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
  ) {}

  public async delete(taskId: string): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      return;
    }

    this.todoTaskPresenter.presentDeletedTask(taskId);
    await this.todoTaskRepository.delete(projectId, taskId);
  }
}
