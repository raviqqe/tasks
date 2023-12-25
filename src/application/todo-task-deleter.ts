import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskDeleter {
  constructor(
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
  ) {}

  public async delete(projectId: string, taskId: string): Promise<void> {
    this.todoTaskPresenter.presentDeletedTask(taskId);
    await this.todoTaskRepository.delete(projectId, taskId);
  }
}
