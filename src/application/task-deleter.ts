import { IConfirmationController } from "./confirmation-controller";
import { ITaskRepository } from "./task-repository";
import { ITaskPresenter } from "./task-presenter";

export class TaskDeleter {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly taskPresenter: ITaskPresenter,
    private readonly confirmationController: IConfirmationController
  ) {}

  public async delete(taskID: string): Promise<void> {
    if (
      await this.confirmationController.confirm(
        "Do you want to delete the task?"
      )
    ) {
      await this.taskRepository.delete(taskID);
      await this.taskPresenter.presentDeletedTask(taskID);
    }
  }
}
