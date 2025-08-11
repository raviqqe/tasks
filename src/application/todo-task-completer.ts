import type { Task } from "../domain/task.js";
import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { DoneTaskPresenter } from "./done-task-presenter.js";
import type { DoneTaskRepository } from "./done-task-repository.js";
import type { TodoTaskDeleter } from "./todo-task-deleter.js";

export class TodoTaskCompleter {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly todoTaskDeleter: TodoTaskDeleter;
  private readonly doneTaskRepository: DoneTaskRepository;
  private readonly doneTaskPresenter: DoneTaskPresenter;

  public constructor(
    currentProjectRepository: CurrentProjectRepository,
    todoTaskDeleter: TodoTaskDeleter,
    doneTaskRepository: DoneTaskRepository,
    doneTaskPresenter: DoneTaskPresenter,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.todoTaskDeleter = todoTaskDeleter;
    this.doneTaskRepository = doneTaskRepository;
    this.doneTaskPresenter = doneTaskPresenter;
  }

  public async complete(task: Task): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Project not selected");
    }

    await this.todoTaskDeleter.delete(task.id);
    this.doneTaskPresenter.presentNewTask(task);
    await this.doneTaskRepository.create(projectId, task);
  }
}
