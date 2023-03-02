import { type ITodoTaskPresenter } from "./todo-task-presenter.js";
import { type ITodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskDeleter {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter
  ) {}

  public async delete(projectId: string, taskId: string): Promise<void> {
    this.todoTaskPresenter.presentDeletedTask(taskId);
    await this.todoTaskRepository.delete(projectId, taskId);
  }
}
