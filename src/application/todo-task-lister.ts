import { type ITodoTaskPresenter } from "./todo-task-presenter.js";
import { type ITodoTaskRepository } from "./todo-task-repository.js";

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
