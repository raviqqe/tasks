import { ITask, formatTask, validateTask } from "../domain/task";
import { formatErrorMessage } from "../domain/error";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { IMessagePresenter } from "./message-presenter";
import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskUpdater {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(projectID: string, task: ITask): Promise<void> {
    task = formatTask(task);

    try {
      validateTask(task);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    await this.todoTaskRepository.update(projectID, task);
    this.todoTaskPresenter.presentUpdatedTask(task);
  }
}
