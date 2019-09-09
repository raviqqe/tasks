import UUID from "pure-uuid";
import { formatTask, validateTask } from "../domain/task";
import { formatErrorMessage } from "../domain/error";
import { ITaskRepository } from "./task-repository";
import { ITaskPresenter } from "./task-presenter";
import { IMessagePresenter } from "./message-presenter";

export class TaskCreator {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly taskPresenter: ITaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async create(name: string): Promise<void> {
    const task = formatTask({ id: new UUID(4).format(), name });

    try {
      validateTask(task);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.taskRepository.create(formatTask(task));
    this.taskPresenter.presentNewTask(task);
  }
}
