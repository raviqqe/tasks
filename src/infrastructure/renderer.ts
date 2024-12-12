import { type Task } from "../domain/task.js";

export interface Renderer {
  renderDoneTasks(tasks: Task[] | null): void;
  renderTodoTasks(tasks: Task[] | null): void;
}
