import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskLister {
  constructor(
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
  ) {}

  public async list(projectId: string): Promise<void> {
    this.todoTaskPresenter.presentTasks(null);
    this.todoTaskPresenter.presentTasks(
      await this.todoTaskRepository.list(projectId),
    );
  }
}
