import type { Task } from "../domain/task.js";

export interface DoneTaskPresenter {
  presentMoreTasks(tasks: Task[]): void;
  presentNewTask(task: Task): void;
  presentTasks(tasks: Task[] | null): void;
}
