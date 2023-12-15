import { type Task } from "../domain/task.js";

export interface TodoTaskRepository {
  create(projectId: string, task: Task): Promise<void>;
  delete(projectId: string, taskId: string): Promise<void>;
  list(projectId: string): Promise<Task[]>;
  reorder(projectId: string, taskIds: string[]): Promise<void>;
  update(projectId: string, task: Task): Promise<void>;
}
