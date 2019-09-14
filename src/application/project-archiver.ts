import { IProject } from "../domain/project";
import { IProjectRepository } from "./project-repository";

export class ProjectArchiver {
  constructor(private readonly projectRepository: IProjectRepository) {}

  public async archive(project: IProject) {
    await this.projectRepository.update({ ...project, archived: true });
  }
}
