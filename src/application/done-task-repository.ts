import { type Task } from "../domain/task.js";

export interface DoneTaskRepository {
  create(projectId: string, task: Task): Promise<void>;
  list(projectId: string, limit: number): AsyncIterable<Task[]>;
}
