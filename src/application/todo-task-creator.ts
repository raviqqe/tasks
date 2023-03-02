import { formatErrorMessage } from "../domain/error.js";
import { formatTask, validateTask } from "../domain/task.js";
import { type IMessagePresenter } from "./message-presenter.js";
import { type ITodoTaskPresenter } from "./todo-task-presenter.js";
import { type ITodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskCreator {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(projectId: string, name: string): Promise<void> {
    const task = formatTask({ id: window.crypto.randomUUID(), name });

    try {
      validateTask(task);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.todoTaskPresenter.presentNewTask(task);
    await this.todoTaskRepository.create(projectId, task);
  }
}
