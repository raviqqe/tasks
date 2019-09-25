import UUID from "pure-uuid";
import { pick, sortBy } from "lodash";
import { IProject } from "../domain/project";
import { IOldProjectRepository } from "./old-project-repository";
import { IProjectRepository } from "./project-repository";
import { IDoneTaskRepository } from "./done-task-repository";
import { ITodoTaskRepository } from "./todo-task-repository";

export class OldDataMigrator {
  constructor(
    private readonly oldProjectRepository: IOldProjectRepository,
    private readonly projectRepository: IProjectRepository,
    private readonly todoTaskRepository: ITodoTaskRepository,
    private readonly doneTaskRepository: IDoneTaskRepository
  ) {}

  public async migrate(): Promise<void> {
    for (const oldProject of await this.oldProjectRepository.list()) {
      if (oldProject.migrated) {
        continue;
      }

      const project: IProject = {
        archived: !!oldProject.archived,
        id: new UUID(5, "ns:URL", JSON.stringify(oldProject)).format(),
        name: oldProject.name
      };

      await this.projectRepository.create(project);

      for (const task of oldProject.todoTasks.reverse()) {
        await this.todoTaskRepository.create(
          project.id,
          pick(task, ["id", "name"])
        );
      }

      for (const task of sortBy(oldProject.doneTasks, "updatedAt")) {
        await this.doneTaskRepository.create(
          project.id,
          pick(task, ["id", "name"])
        );
      }

      await this.oldProjectRepository.markMigrated(oldProject.name);
    }
  }
}
