import { ITask } from "../domain/task";

export interface ITodoTaskPresenter {
  presentDeletedTask(taskId: string): void;
  presentNewTask(task: ITask): void;
  presentReorderedTasks(taskIds: string[]): void;
  presentTasks(tasks: ITask[] | null): void;
  presentUpdatedTask(task: ITask): void;
}
