import { ITodoTaskRepository } from "./todo-task-repository";

export class TodoTaskReorderer {
  constructor(private readonly todoTaskRepository: ITodoTaskRepository) {}

  public async reorder(projectID: string, taskIDs: string[]): Promise<void> {
    await this.todoTaskRepository.reorder(projectID, taskIDs);
  }
}
