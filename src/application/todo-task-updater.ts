import { ITask, formatTask, validateTask } from "../domain/task";
import { formatErrorMessage } from "../domain/error";
import { TodoTaskDeleter } from "./todo-task-deleter";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { IMessagePresenter } from "./message-presenter";
import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskUpdater {
  constructor(
    private readonly todoTaskDeleter: TodoTaskDeleter,
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(projectId: string, task: ITask): Promise<void> {
    task = formatTask(task);

    if (task.name === "") {
      await this.todoTaskDeleter.delete(projectId, task.id);
      return;
    }

    try {
      validateTask(task);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error));
      return;
    }

    this.todoTaskPresenter.presentUpdatedTask(task);
    await this.todoTaskRepository.update(projectId, task);
  }
}
