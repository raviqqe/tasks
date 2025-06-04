import { formatTask, type Task, validateTask } from "../domain/task.js";
import { type ConfirmationController } from "./confirmation-controller.js";
import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type TodoTaskDeleter } from "./todo-task-deleter.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskUpdater {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly todoTaskDeleter: TodoTaskDeleter;
  private readonly todoTaskRepository: TodoTaskRepository;
  private readonly todoTaskPresenter: TodoTaskPresenter;
  private readonly confirmationController: ConfirmationController;

  constructor(
    currentProjectRepository: CurrentProjectRepository,
    todoTaskDeleter: TodoTaskDeleter,
    todoTaskRepository: TodoTaskRepository,
    todoTaskPresenter: TodoTaskPresenter,
    confirmationController: ConfirmationController,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.todoTaskDeleter = todoTaskDeleter;
    this.todoTaskRepository = todoTaskRepository;
    this.todoTaskPresenter = todoTaskPresenter;
    this.confirmationController = confirmationController;
  }

  public async update(task: Task): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Project not selected");
    }

    task = formatTask(task);

    if (
      !task.name &&
      (await this.confirmationController.confirm("Delete the task?"))
    ) {
      await this.todoTaskDeleter.delete(task.id);
      return;
    } else if (!task.name) {
      return;
    }

    validateTask(task);

    this.todoTaskPresenter.presentUpdatedTask(task);
    await this.todoTaskRepository.update(projectId, task);
  }
}
