import { type ITask } from "../domain/task.js";

export interface IDoneTaskPresenter {
  presentNewTask(task: ITask): void;
  presentTasks(tasks: ITask[] | null): void;
  presentMoreTasks(tasks: ITask[]): void;
}
