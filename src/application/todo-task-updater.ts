import { type ITask, formatTask, validateTask } from "../domain/task.js";
import { type IConfirmationController } from "./confirmation-controller.js";
import { type TodoTaskDeleter } from "./todo-task-deleter.js";
import { type ITodoTaskPresenter } from "./todo-task-presenter.js";
import { type ITodoTaskRepository } from "./todo-task-repository.js";

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
