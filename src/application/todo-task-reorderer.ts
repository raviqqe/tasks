import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type TodoTaskPresenter } from "./todo-task-presenter.js";
import { type TodoTaskRepository } from "./todo-task-repository.js";

export class TodoTaskReorderer {
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

  public async reorder(taskIds: string[]): Promise<void> {
    // Present reordered tasks optimistically.
    this.todoTaskPresenter.presentReorderedTasks(taskIds);

    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Project not selected");
    }

    await this.todoTaskRepository.reorder(projectId, taskIds);
  }
}
