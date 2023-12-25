import { type Task, formatTask, validateTask } from "../domain/task.js";
import { type ConfirmationController } from "./confirmation-controller.js";
import { type TodoTaskDeleter } from "./todo-task-deleter.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskUpdater {
  constructor(
    private readonly todoTaskDeleter: TodoTaskDeleter,
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
    private readonly confirmationController: ConfirmationController,
  ) {}

  public async update(projectId: string, task: Task): Promise<void> {
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
