import UUID from "pure-uuid";
import { formatTask, validateTask } from "../domain/task";
import { formatErrorMessage } from "../domain/error";
import { ITodoTaskRepository } from "./todo-task-repository";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { IMessagePresenter } from "./message-presenter";

export class TodoTaskCreator {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(projectID: string, name: string): Promise<void> {
    const task = formatTask({ id: new UUID(4).format(), name });

    try {
      validateTask(task);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    this.todoTaskPresenter.presentNewTask(task);
    await this.todoTaskRepository.create(projectID, task);
  }
}
