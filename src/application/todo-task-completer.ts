import { type ITask } from "../domain/task.js";
import { type IDoneTaskPresenter } from "./done-task-presenter.js";
import { type IDoneTaskRepository } from "./done-task-repository.js";
import { type TodoTaskDeleter } from "./todo-task-deleter.js";

export class TodoTaskCompleter {
  constructor(
    private readonly todoTaskDeleter: TodoTaskDeleter,
    private readonly doneTaskRepository: IDoneTaskRepository,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async complete(projectId: string, task: ITask): Promise<void> {
    await this.todoTaskDeleter.delete(projectId, task.id);
    this.doneTaskPresenter.presentNewTask(task);
    await this.doneTaskRepository.create(projectId, task);
  }
}
