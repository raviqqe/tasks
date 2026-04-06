import { atom } from "nanostores";
import type { DoneTaskPresenter } from "../application/done-task-presenter.js";
import type { Task } from "../domain/task.js";

export class NanostoresDoneTaskPresenter implements DoneTaskPresenter {
  readonly tasks = atom<Task[] | null>(null);

  presentTasks(tasks: Task[] | null): void {
    this.tasks.set(tasks);
  }

  presentMoreTasks(tasks: Task[]): void {
    const oldTasks = this.tasks.get();

    if (!oldTasks) {
      return;
    }

    this.tasks.set([...oldTasks, ...tasks]);
  }

  presentNewTask(task: Task): void {
    const tasks = this.tasks.get();

    if (!tasks) {
      return;
    }

    this.tasks.set([task, ...tasks]);
  }
}
