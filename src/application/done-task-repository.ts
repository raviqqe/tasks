import { ITask } from "../domain/task";

export interface IDoneTaskRepository {
  create(projectId: string, task: ITask): Promise<void>;
  list(projectId: string, limit: number): AsyncIterable<ITask[]>;
}
