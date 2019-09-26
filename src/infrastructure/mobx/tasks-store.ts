import { action, observable } from "mobx";
import { ITask } from "../../domain/task";

export class TasksStore {
  @observable public todoTasks: ITask[] | null = null;
  @observable public doneTasks: ITask[] | null = null;

  @action
  public setTodoTasks(tasks: ITask[] | null): void {
    this.todoTasks = tasks;
  }

  @action
  public setDoneTasks(tasks: ITask[] | null): void {
    this.doneTasks = tasks;
  }
}
