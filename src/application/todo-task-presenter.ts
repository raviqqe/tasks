import type { Task } from "../domain/task.js";

export interface TodoTaskPresenter {
  presentDeletedTask(taskId: string): void;
  presentNewTask(task: Task): void;
  presentReorderedTasks(taskIds: string[]): void;
  presentTasks(tasks: Task[] | null): void;
  presentUpdatedTask(task: Task): void;
}
