import { ITask } from "../domain/task";

export interface ITodoTaskPresenter {
  presentDeletedTask(taskID: string): void;
  presentNewTask(task: ITask): void;
  presentReorderedTasks(taskIDs: string[]): void;
  presentTasks(tasks: ITask[] | null): void;
  presentUpdatedTask(task: ITask): void;
}
