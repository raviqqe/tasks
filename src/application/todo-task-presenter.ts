import { ITask } from "../domain/task";

export interface ITodoTaskPresenter {
  presentDeletedTask(taskID: string): void;
  presentNewTask(task: ITask): void;
  presentTasks(tasks: ITask[]): void;
  presentUpdatedTask(task: ITask): void;
}
