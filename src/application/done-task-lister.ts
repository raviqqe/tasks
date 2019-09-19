import { ITask } from "../domain/task";
import { IDoneTaskRepository } from "./done-task-repository";
import { IDoneTaskPresenter } from "./done-task-presenter";

const defaultLimit: number = 20;

export class DoneTaskLister {
  private iterator: AsyncIterator<ITask[]> | null = null;

  constructor(
    private readonly doneTaskRepository: IDoneTaskRepository,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async list(projectID: string): Promise<void> {
    this.iterator = this.doneTaskRepository.list(projectID, defaultLimit);
    this.doneTaskPresenter.presentTasks(
      (await this.iterator.next()).value || []
    );
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.iterator.next();

    if (result.done) {
      return;
    }

    this.doneTaskPresenter.presentMoreTasks(result.value);
  }
}
