import { ITodoTaskRepository } from "./todo-task-repository";
import { ITodoTaskPresenter } from "./todo-task-presenter";

export class TodoTaskReorderer {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter
  ) {}

  public async reorder(projectID: string, taskIDs: string[]): Promise<void> {
    this.todoTaskPresenter.presentReorderedTasks(taskIDs);
    await this.todoTaskRepository.reorder(projectID, taskIDs);
  }
}
