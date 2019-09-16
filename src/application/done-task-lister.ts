import { IDoneTaskRepository } from "./done-task-repository";
import { IDoneTaskPresenter } from "./done-task-presenter";

const defaultLimit: number = 20;

export class DoneTaskLister {
  constructor(
    private readonly doneTaskRepository: IDoneTaskRepository,
    private readonly doneTaskPresenter: IDoneTaskPresenter
  ) {}

  public async list(projectID: string): Promise<void> {
    this.doneTaskPresenter.presentTasks(
      this.doneTaskRepository.list(projectID, defaultLimit)
    );
  }
}
