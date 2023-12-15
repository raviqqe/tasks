import { type Task } from "../domain/task.js";
import { type DoneTaskPresenter } from "./done-task-presenter.js";
import { type DoneTaskRepository } from "./done-task-repository.js";

const defaultLimit = 20;

export class DoneTaskLister {
  private iterator: AsyncIterator<Task[], void> | null = null;

  constructor(
    private readonly doneTaskRepository: DoneTaskRepository,
    private readonly doneTaskPresenter: DoneTaskPresenter,
  ) {}

  public async list(projectId: string): Promise<void> {
    this.iterator = this.doneTaskRepository
      .list(projectId, defaultLimit)
      [Symbol.asyncIterator]();
    this.doneTaskPresenter.presentTasks(
      (await this.iterator.next()).value || [],
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
