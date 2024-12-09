import { formatErrorMessage } from "../domain/error.js";
import { formatTask, validateTask } from "../domain/task.js";
import { CurrentProjectRepository } from "./current-project-repository.js";
import { type MessagePresenter } from "./message-presenter.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskCreator {
  constructor(
    private readonly currentProjectRepository: CurrentProjectRepository,
    private readonly todoTaskRepository: TodoTaskRepository,
    private readonly todoTaskPresenter: TodoTaskPresenter,
    private readonly messagePresenter: MessagePresenter,
  ) {}

  public async create(name: string): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      return;
    }

    const task = formatTask({ id: window.crypto.randomUUID(), name });

    try {
      validateTask(task);
    } catch (error) {
      this.messagePresenter.present(formatErrorMessage(error as Error));
      return;
    }

    this.todoTaskPresenter.presentNewTask(task);
    await this.todoTaskRepository.create(projectId, task);
  }
}
