import { action, observable } from "mobx";
import { ITask } from "../../domain/task";

export class TasksStore {
  @observable public todoTasks: ITask[] | null = null;
  @observable public doneTasks: ITask[] | null = null;

  @action
  public setTodoTasks(tasks: ITask[]): void {
    this.todoTasks = tasks;
  }

  @action
  public prependTodoTask(task: ITask): void {
    if (!this.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.todoTasks = [task, ...this.todoTasks];
  }

  @action
  public updateTodoTask(updatedTask: ITask): void {
    if (!this.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.todoTasks = this.todoTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
  }

  @action
  public deleteTodoTask(taskID: string): void {
    if (!this.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.todoTasks = this.todoTasks.filter(task => task.id !== taskID);
  }

  @action
  public setDoneTasks(tasks: ITask[]): void {
    this.doneTasks = tasks;
  }

  @action
  public prependDoneTask(task: ITask): void {
    if (!this.doneTasks) {
      throw new Error("done tasks not loaded");
    }

    this.doneTasks = [task, ...this.doneTasks];
  }
}
