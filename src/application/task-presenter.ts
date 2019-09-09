import { ITask } from "../domain/task";

export interface ITaskPresenter {
  presentTasks(tasks: ITask[]): void;
  presentMoreTasks(tasks: ITask[]): void;
  presentNewTask(task: ITask): void;
  presentUpdatedTask(task: ITask): void;
  presentDeletedTask(taskID: string): void;
}
