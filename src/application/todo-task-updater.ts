import { ITask, formatTask, validateTask } from "../domain/task";
import { IConfirmationController } from "./confirmation-controller";
import { TodoTaskDeleter } from "./todo-task-deleter";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskUpdater {
  constructor(
    private readonly todoTaskDeleter: TodoTaskDeleter,
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async update(projectId: string, task: ITask): Promise<void> {
    task = formatTask(task);

    if (
      !task.name &&
      (await this.confirmationController.confirm("Delete the task?"))
    ) {
      await this.todoTaskDeleter.delete(projectId, task.id);
      return;
    } else if (!task.name) {
      return;
    }

    validateTask(task);

    this.todoTaskPresenter.presentUpdatedTask(task);
    await this.todoTaskRepository.update(projectId, task);
  }
}
