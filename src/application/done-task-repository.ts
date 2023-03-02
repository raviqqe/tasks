import { type ITask } from "../domain/task.js";

export interface IDoneTaskRepository {
  create(projectId: string, task: ITask): Promise<void>;
  list(projectId: string, limit: number): AsyncIterable<ITask[]>;
}
