import { type Task } from "../domain/task.js";
import { type DoneTaskPresenter } from "./done-task-presenter.js";
import { type DoneTaskRepository } from "./done-task-repository.js";
import { type TodoTaskDeleter } from "./todo-task-deleter.js";

export class TodoTaskCompleter {
  constructor(
    private readonly todoTaskDeleter: TodoTaskDeleter,
    private readonly doneTaskRepository: DoneTaskRepository,
    private readonly doneTaskPresenter: DoneTaskPresenter,
  ) {}

  public async complete(projectId: string, task: Task): Promise<void> {
    await this.todoTaskDeleter.delete(projectId, task.id);
    this.doneTaskPresenter.presentNewTask(task);
    await this.doneTaskRepository.create(projectId, task);
  }
}
