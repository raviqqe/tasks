import { type ITask } from "../domain/task.js";
import { type IDoneTaskPresenter } from "./done-task-presenter.js";
import { type IDoneTaskRepository } from "./done-task-repository.js";

const defaultLimit = 20;

export class DoneTaskLister {
  private iterator: AsyncIterator<ITask[], void> | null = null;

  constructor(
    private readonly doneTaskRepository: IDoneTaskRepository,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async list(projectId: string): Promise<void> {
    this.iterator = this.doneTaskRepository
      .list(projectId, defaultLimit)
      [Symbol.asyncIterator]();
    this.doneTaskPresenter.presentTasks(
      (await this.iterator.next()).value || []
    );
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("Iterator not initialized");
    }

    const result = await this.iterator.next();

    if (result.done) {
      return;
    }

    this.doneTaskPresenter.presentMoreTasks(result.value);
  }
}
