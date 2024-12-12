import { type DoneTaskPresenter } from "../application/done-task-presenter.js";
import { type Task } from "../domain/task.js";
import { type Renderer } from "./renderer.js";

export class NanostoresDoneTaskPresenter implements DoneTaskPresenter {
  private renderer: Renderer | null = null;
  private tasks: Task[] | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentTasks(tasks: Task[] | null): void {
    this.renderTasks(tasks);
  }

  public presentMoreTasks(tasks: Task[]): void {
    this.renderTasks(this.tasks && [...this.tasks, ...tasks]);
  }

  public presentNewTask(task: Task): void {
    this.renderTasks(this.tasks && [task, ...this.tasks]);
  }

  private renderTasks(tasks: Task[] | null): void {
    this.tasks = tasks;

    this.renderer?.renderDoneTasks(this.tasks);
  }
}
