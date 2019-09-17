import { IDoneTaskPresenter } from "../../application/done-task-presenter";
import { ITask } from "../../domain/task";
import { TasksStore } from "./tasks-store";

export class MobxDoneTaskPresenter implements IDoneTaskPresenter {
  private iterator: AsyncIterator<ITask[], void> = (async function*() {})();

  constructor(private readonly store: TasksStore) {}

  public async presentTasks(
    iterator: AsyncIterator<ITask[], void>
  ): Promise<void> {
    this.iterator = iterator;
    this.store.setDoneTasks((await this.iterator.next()).value || []);
  }

  public async presentMoreTasks(): Promise<void> {
    const result = await this.iterator.next();

    if (result.done) {
      return;
    }

    this.store.setDoneTasks(result.value);
  }

  public presentNewTask(task: ITask): void {
    this.store.prependDoneTask(task);
  }
}
