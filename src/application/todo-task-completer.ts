import { ITask } from "../domain/task";
import { IDoneTaskPresenter } from "./done-task-presenter";
import { IDoneTaskRepository } from "./done-task-repository";
import { TodoTaskDeleter } from "./todo-task-deleter";

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
