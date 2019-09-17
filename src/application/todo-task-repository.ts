import { ITask } from "../domain/task";

export interface ITodoTaskRepository {
  create(projectID: string, task: ITask): Promise<void>;
  delete(projectID: string, taskID: string): Promise<void>;
  list(projectID: string): Promise<ITask[]>;
  reorder(projectID: string, taskIDs: string[]): Promise<void>;
  update(projectID: string, task: ITask): Promise<void>;
}
