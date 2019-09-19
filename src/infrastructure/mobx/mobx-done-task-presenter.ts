import { IDoneTaskPresenter } from "../../application/done-task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxDoneTaskPresenter implements IDoneTaskPresenter {
  constructor(private readonly store: TasksStore) {}

  public async presentTasks(tasks: ITask[]): Promise<void> {
    this.store.setDoneTasks(tasks);
  }

  public async presentMoreTasks(tasks: ITask[]): Promise<void> {
    this.store.appendDoneTasks(tasks);
  }

  public presentNewTask(task: ITask): void {
    this.store.prependDoneTask(task);
  }
}
