import { ITask } from "../domain/task";
import { ITodoTaskRepository } from "./todo-task-repository";
import { IDoneTaskRepository } from "./done-task-repository";
import { ITodoTaskPresenter } from "./todo-task-presenter";
import { IDoneTaskPresenter } from "./done-task-presenter";

export class TodoTaskCompleter {
  constructor(
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly doneTaskRepository: IDoneTaskRepository,
    private readonly todoTaskPresenter: ITodoTaskPresenter,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async complete(projectId: string, task: ITask) {
    this.todoTaskPresenter.presentDeletedTask(task.id);
    await this.todoTaskRepository.delete(projectId, task.id);
    this.doneTaskPresenter.presentNewTask(task);
    await this.doneTaskRepository.create(projectId, task);
  }
}
