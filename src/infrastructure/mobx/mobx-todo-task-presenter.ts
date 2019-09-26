import { ITodoTaskPresenter } from "../../application/todo-task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxTodoTaskPresenter implements ITodoTaskPresenter {
  constructor(private readonly store: TasksStore) {}

  public presentTasks(tasks: ITask[] | null): void {
    this.store.setTodoTasks(tasks);
  }

  public presentNewTask(task: ITask): void {
    if (!this.store.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.store.setTodoTasks([task, ...this.store.todoTasks]);
  }

  public presentReorderedTasks(taskIDs: string[]): void {
    if (!this.store.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    const taskMap = new Map<string, ITask>(
      this.store.todoTasks.map(task => [task.id, task])
    );
    this.store.setTodoTasks(taskIDs.map(id => taskMap.get(id) as ITask));
  }

  public presentUpdatedTask(updatedTask: ITask): void {
    if (!this.store.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.store.setTodoTasks(
      this.store.todoTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  public presentDeletedTask(taskID: string): void {
    if (!this.store.todoTasks) {
      throw new Error("todo tasks not loaded");
    }

    this.store.setTodoTasks(
      this.store.todoTasks.filter(task => task.id !== taskID)
    );
  }
}
