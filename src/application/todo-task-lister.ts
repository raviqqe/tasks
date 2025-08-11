import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { TodoTaskPresenter } from "./todo-task-presenter.js";
import type { TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskLister {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly todoTaskRepository: TodoTaskRepository;
  private readonly todoTaskPresenter: TodoTaskPresenter;

  constructor(
    currentProjectRepository: CurrentProjectRepository,
    todoTaskRepository: TodoTaskRepository,
    todoTaskPresenter: TodoTaskPresenter,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.todoTaskRepository = todoTaskRepository;
    this.todoTaskPresenter = todoTaskPresenter;
  }

  public async list(): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Current project not defined");
    }

    this.todoTaskPresenter.presentTasks(null);
    this.todoTaskPresenter.presentTasks(
      await this.todoTaskRepository.list(projectId),
    );
  }
}
