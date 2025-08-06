import { type Task } from "../domain/task.js";
import { type CurrentProjectRepository } from "./current-project-repository.js";
import { type DoneTaskPresenter } from "./done-task-presenter.js";
import { type DoneTaskRepository } from "./done-task-repository.js";

const defaultLimit = 20;

export class DoneTaskLister {
  private readonly currentProjectRepository: CurrentProjectRepository;
  private readonly doneTaskRepository: DoneTaskRepository;
  private readonly doneTaskPresenter: DoneTaskPresenter;
  private iterator: AsyncIterator<Task[], void> | null = null;

  constructor(
    currentProjectRepository: CurrentProjectRepository,
    doneTaskRepository: DoneTaskRepository,
    doneTaskPresenter: DoneTaskPresenter,
  ) {
    this.currentProjectRepository = currentProjectRepository;
    this.doneTaskRepository = doneTaskRepository;
    this.doneTaskPresenter = doneTaskPresenter;
  }

  public async list(): Promise<void> {
    const projectId = await this.currentProjectRepository.get();

    if (!projectId) {
      throw new Error("Current project not defined");
    }

    this.doneTaskPresenter.presentTasks(null);

    this.iterator = this.doneTaskRepository
      .list(projectId, defaultLimit)
      [Symbol.asyncIterator]();
    this.doneTaskPresenter.presentTasks(
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      (await this.iterator.next()).value ?? [],
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
