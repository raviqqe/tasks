import UUID from "pure-uuid";
import { formatErrorMessage } from "../domain/error";
import { formatTask, validateTask } from "../domain/task";
import { IMessagePresenter } from "./message-presenter";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskCreator {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(projectId: string, name: string): Promise<void> {
    const task = formatTask({ id: new UUID(4).format(), name });

    try {
      validateTask(task);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    this.todoTaskPresenter.presentNewTask(task);
    await this.todoTaskRepository.create(projectId, task);
  }
}
