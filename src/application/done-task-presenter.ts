import { ITask } from "../domain/task";

export interface IDoneTaskPresenter {
  presentNewTask(task: ITask): void;
  presentTasks(iterator: AsyncIterator<ITask[], void>): void;
}
