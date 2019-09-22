import { ITodoTaskPresenter } from "../../application/todo-task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxTodoTaskPresenter implements ITodoTaskPresenter {
  constructor(private readonly store: TasksStore) {}

  public presentTasks(tasks: ITask[]): void {
    this.store.setTodoTasks(tasks);
  }

  public presentNewTask(task: ITask): void {
    this.store.prependTodoTask(task);
  }

  public presentReorderedTasks(taskIDs: string[]): void {
    this.store.reorderTodoTasks(taskIDs);
  }

  public presentUpdatedTask(task: ITask): void {
    this.store.updateTodoTask(task);
  }

  public presentDeletedTask(taskID: string): void {
    this.store.deleteTodoTask(taskID);
  }
}
