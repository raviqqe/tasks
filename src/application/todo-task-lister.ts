import { ITodoTaskRepository } from "./todo-task-repository";
import { ITodoTaskPresenter } from "./todo-task-presenter";

export class TodoTaskLister {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter
  ) {}

  public async list(projectID: string): Promise<void> {
    this.todoTaskPresenter.presentTasks(
      await this.todoTaskRepository.list(projectID)
    );
  }
}
