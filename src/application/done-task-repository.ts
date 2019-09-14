import { ITask } from "../domain/task";

export interface IDoneTaskRepository {
  create(projectID: string, task: ITask): Promise<void>;
  list(projectID: string, limit: number): AsyncIterator<ITask[], void>;
}
