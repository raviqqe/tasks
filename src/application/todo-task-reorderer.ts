import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskReorderer {
  constructor(
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
  ) {}

  public async reorder(projectId: string, taskIds: string[]): Promise<void> {
    this.todoTaskPresenter.presentReorderedTasks(taskIds);
    await this.todoTaskRepository.reorder(projectId, taskIds);
  }
}
