import { type Task } from "../domain/task.js";

export interface DoneTaskPresenter {
  presentNewTask(task: Task): void;
  presentTasks(tasks: Task[] | null): void;
  presentMoreTasks(tasks: Task[]): void;
}
