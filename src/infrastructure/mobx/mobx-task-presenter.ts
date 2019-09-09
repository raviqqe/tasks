import { ITaskPresenter } from "../../application/task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxTaskPresenter implements ITaskPresenter {
  constructor(private readonly store: TasksStore) {}

  public presentTasks(tasks: ITask[]): void {
    this.store.setTasks(tasks);
  }

  public presentMoreTasks(tasks: ITask[]): void {
    this.store.appendTasks(tasks);
  }

  public presentNewTask(task: ITask): void {
    this.store.prependTask(task);
  }

  public presentUpdatedTask(task: ITask): void {
    this.store.updateTask(task);
  }

  public presentDeletedTask(taskID: string): void {
    this.store.deleteTask(taskID);
  }
}
