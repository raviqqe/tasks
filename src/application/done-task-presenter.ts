import { ITask } from "../domain/task";

export interface IDoneTaskPresenter {
  presentNewTask(task: ITask): void;
  presentTasks(tasks: ITask[]): void;
  presentMoreTasks(tasks: ITask[]): void;
}
