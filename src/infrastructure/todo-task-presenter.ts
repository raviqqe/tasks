import { type TodoTaskPresenter } from "../application/todo-task-presenter.js";
import { type Task } from "../domain/task.js";
import { type Renderer } from "./renderer.js";

export class TodoTaskPresenter implements TodoTaskPresenter {
  private renderer: Renderer | null = null;
  private tasks: Task[] | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentTasks(tasks: Task[] | null): void {
    this.renderTasks(tasks);
  }

  public presentNewTask(task: Task): void {
    this.renderTasks(this.tasks && [task, ...this.tasks]);
  }

  public presentReorderedTasks(taskIds: string[]): void {
    if (this.tasks) {
      const taskMap = Object.fromEntries(
        this.tasks.map((task) => [task.id, task]),
      );
      this.renderTasks(
        taskIds.map((id) => {
          const task = taskMap[id];

          if (!task) {
            throw new Error(`task not found: ${id}`);
          }

          return task;
        }),
      );
    }
  }

  public presentUpdatedTask(updatedTask: Task): void {
    this.renderTasks(
      this.tasks?.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  }

  public presentDeletedTask(taskId: string): void {
    this.renderTasks(this.tasks?.filter((task) => task.id !== taskId));
  }

  private renderTasks(tasks: Task[] | null | undefined): void {
    this.tasks = tasks ?? null;

    this.renderer?.renderTodoTasks(this.tasks);
  }
}
