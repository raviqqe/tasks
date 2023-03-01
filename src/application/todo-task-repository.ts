import { ITask } from "../domain/task.js";

export interface ITodoTaskRepository {
  create(projectId: string, task: ITask): Promise<void>;
  delete(projectId: string, taskId: string): Promise<void>;
  list(projectId: string): Promise<ITask[]>;
  reorder(projectId: string, taskIds: string[]): Promise<void>;
  update(projectId: string, task: ITask): Promise<void>;
}
