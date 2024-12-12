import { type Task } from "../domain/task.js";

export interface Renderer {
  renderTodoTasks(tasks: Task[] | null): void;
}
