import { ITask } from "../domain/task";

export interface IDoneTaskPresenter {
  presentNewTask(task: ITask): void;
  presentTasks(tasks: ITask[] | null): void;
  presentMoreTasks(tasks: ITask[]): void;
}
