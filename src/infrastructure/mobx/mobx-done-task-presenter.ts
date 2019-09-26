import { IDoneTaskPresenter } from "../../application/done-task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxDoneTaskPresenter implements IDoneTaskPresenter {
  constructor(private readonly store: TasksStore) {}

  public presentTasks(tasks: ITask[] | null): void {
    this.store.setDoneTasks(tasks);
  }

  public presentMoreTasks(tasks: ITask[]): void {
    if (!this.store.doneTasks) {
      throw new Error("done tasks not loaded");
    }

    this.store.setDoneTasks([...this.store.doneTasks, ...tasks]);
  }

  public presentNewTask(task: ITask): void {
    if (!this.store.doneTasks) {
      throw new Error("done tasks not loaded");
    }

    this.store.setDoneTasks([task, ...this.store.doneTasks]);
  }
}
