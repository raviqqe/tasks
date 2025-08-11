import { atom } from "nanostores";
import type { TodoTaskPresenter } from "../application/todo-task-presenter.js";
import type { Task } from "../domain/task.js";

export class NanostoresTodoTaskPresenter implements TodoTaskPresenter {
  public readonly tasks = atom<Task[] | null>(null);

  public presentTasks(tasks: Task[] | null): void {
    this.tasks.set(tasks);
  }

  public presentNewTask(task: Task): void {
    const tasks = this.tasks.get();

    if (!tasks) {
      return;
    }

    this.presentTasks([task, ...tasks]);
  }

  public presentReorderedTasks(taskIds: string[]): void {
    const tasks = this.tasks.get();

    if (!tasks) {
      return;
    }

    const taskMap = Object.fromEntries(tasks.map((task) => [task.id, task]));

    this.presentTasks(
      taskIds.map((id) => {
        const task = taskMap[id];

        if (!task) {
          throw new Error(`task not found: ${id}`);
        }

        return task;
      }),
    );
  }

  public presentUpdatedTask(updatedTask: Task): void {
    const tasks = this.tasks.get();

    if (!tasks) {
      return;
    }

    this.presentTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  public presentDeletedTask(taskId: string): void {
    const tasks = this.tasks.get();

    if (!tasks) {
      return;
    }

    this.presentTasks(tasks.filter((task) => task.id !== taskId));
  }
}
