import { ITask } from "../domain/task";

export interface ITaskRepository {
  create(task: ITask): Promise<void>;
  delete(taskID: string): Promise<void>;
  list(limit: number): AsyncIterator<ITask[], void>;
  update(task: ITask): Promise<void>;
}
