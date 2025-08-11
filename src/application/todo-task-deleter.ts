import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { TodoTaskPresenter } from "./todo-task-presenter.js";
import type { TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskDeleter {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly todoTaskRepository: TodoTaskRepository;
  private readonly todoTaskPresenter: TodoTaskPresenter;

  public constructor(
    currentProjectRepository: CurrentProjectRepository,
    todoTaskRepository: TodoTaskRepository,
    todoTaskPresenter: TodoTaskPresenter,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.todoTaskRepository = todoTaskRepository;
    this.todoTaskPresenter = todoTaskPresenter;
  }

  public async delete(taskId: string): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Project not selected");
    }

    this.todoTaskPresenter.presentDeletedTask(taskId);
    await this.todoTaskRepository.delete(projectId, taskId);
  }
}
