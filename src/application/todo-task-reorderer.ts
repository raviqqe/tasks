import { ITodoTaskPresenter } from "./todo-task-presenter.js";
import { ITodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskReorderer {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter
  ) {}

  public async reorder(projectId: string, taskIds: string[]): Promise<void> {
    this.todoTaskPresenter.presentReorderedTasks(taskIds);
    await this.todoTaskRepository.reorder(projectId, taskIds);
  }
}
