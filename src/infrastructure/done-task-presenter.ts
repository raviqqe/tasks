import { IDoneTaskPresenter } from "../application/done-task-presenter";
import { ITask } from "../domain/task";
import { IRenderer } from "./renderer";

export class DoneTaskPresenter implements IDoneTaskPresenter {
  private renderer: IRenderer | null = null;
  private tasks: ITask[] | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentTasks(tasks: ITask[] | null): void {
    this.renderTasks(tasks);
  }

  public presentMoreTasks(tasks: ITask[]): void {
    this.renderTasks(this.tasks && [...this.tasks, ...tasks]);
  }

  public presentNewTask(task: ITask): void {
    this.renderTasks(this.tasks && [task, ...this.tasks]);
  }

  private renderTasks(tasks: ITask[] | null): void {
    this.tasks = tasks;

    this.renderer?.renderDoneTasks(this.tasks);
  }
}
