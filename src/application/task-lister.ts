import { ITask } from "../domain/task";
import { ITaskRepository } from "./task-repository";
import { ITaskPresenter } from "./task-presenter";

const defaultLimit: number = 20;

export class TaskLister {
  private iterator: AsyncIterator<ITask[]> | null = null;

  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly taskPresenter: ITaskPresenter
  ) {}

  public async list(): Promise<void> {
    this.iterator = this.taskRepository.list(defaultLimit);
    this.taskPresenter.presentTasks((await this.iterator.next()).value || []);
  }

  public async listMore(): Promise<void> {
    if (!this.iterator) {
      throw new Error("iterator not initialized");
    }

    const result = await this.iterator.next();

    if (result.done) {
      return;
    }

    this.taskPresenter.presentMoreTasks(result.value);
  }
}
