import { ITask, formatTask, validateTask } from "../domain/task";
import { formatErrorMessage } from "../domain/error";
import { TaskDeleter } from "./task-deleter";
import { ITaskRepository } from "./task-repository";
import { ITaskPresenter } from "./task-presenter";
import { IMessagePresenter } from "./message-presenter";

export class TaskUpdater {
  constructor(
    private readonly taskDeleter: TaskDeleter,
    private readonly taskRepository: ITaskRepository,
    private readonly taskPresenter: ITaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(originalTask: ITask, name: string): Promise<void> {
    const task = formatTask({ ...originalTask, name });

    if (!task.name) {
      await this.taskDeleter.delete(task.id);
      return;
    }

    try {
      validateTask(task);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.taskRepository.update(task);
    this.taskPresenter.presentUpdatedTask(task);
  }
}
