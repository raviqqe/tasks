import { ITodoTaskPresenter } from "../application/todo-task-presenter";
import { ITask } from "../domain/task";
import { IRenderer } from "./renderer";

export class TodoTaskPresenter implements ITodoTaskPresenter {
  private renderer: IRenderer | null = null;
  private tasks: ITask[] | null = null;

  public setRenderer(renderer: IRenderer) {
    this.renderer = renderer;
  }

  public presentTasks(tasks: ITask[] | null): void {
    this.renderTasks(tasks);
  }

  public presentNewTask(task: ITask): void {
    this.renderTasks(this.tasks && [task, ...this.tasks]);
  }

  public presentReorderedTasks(taskIds: string[]): void {
    if (this.tasks) {
      const taskMap = new Map<string, ITask>(
        this.tasks.map(task => [task.id, task])
      );
      this.renderTasks(taskIds.map(id => taskMap.get(id) as ITask));
    }
  }

  public presentUpdatedTask(updatedTask: ITask): void {
    this.renderTasks(
      this.tasks?.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
  }

  public presentDeletedTask(taskId: string): void {
    this.renderTasks(this.tasks?.filter(task => task.id !== taskId));
  }

  private renderTasks(tasks: ITask[] | null | undefined): void {
    this.tasks = tasks || null;

    this.renderer?.renderTodoTasks(this.tasks);
  }
}
