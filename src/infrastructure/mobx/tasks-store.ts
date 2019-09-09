import { action, observable } from "mobx";
import { ITask } from "../../domain/task";

export class TasksStore {
  @observable public tasks: ITask[] | null = null;

  @action
  public setTasks(tasks: ITask[]): void {
    this.tasks = tasks;
  }

  @action
  public appendTasks(tasks: ITask[]): void {
    if (!this.tasks) {
      throw new Error("tasks not loaded");
    }

    this.tasks = [...this.tasks, ...tasks];
  }

  @action
  public prependTask(task: ITask): void {
    if (!this.tasks) {
      throw new Error("tasks not loaded");
    }

    this.tasks = [task, ...this.tasks];
  }

  @action
  public updateTask(updatedTask: ITask): void {
    if (!this.tasks) {
      throw new Error("tasks not loaded");
    }

    this.tasks = this.tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  @action
  public deleteTask(taskID: string): void {
    if (!this.tasks) {
      throw new Error("tasks not loaded");
    }

    this.tasks = this.tasks.filter(task => task.id !== taskID);
  }
}
