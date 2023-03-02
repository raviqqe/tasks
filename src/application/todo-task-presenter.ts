import { type ITask } from "../domain/task.js";

export interface ITodoTaskPresenter {
  presentDeletedTask(taskId: string): void;
  presentNewTask(task: ITask): void;
  presentReorderedTasks(taskIds: string[]): void;
  presentTasks(tasks: ITask[] | null): void;
  presentUpdatedTask(task: ITask): void;
}
