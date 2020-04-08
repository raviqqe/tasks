import { ITodoTaskPresenter } from "./todo-task-presenter";
import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskLister {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter
  ) {}

  public async list(projectId: string): Promise<void> {
    this.todoTaskPresenter.presentTasks(
      await this.todoTaskRepository.list(projectId)
    );
  }
}
