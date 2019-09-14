import { IProjectPresenter } from "../../application/project-presenter";
import { IProject } from "../../domain/project";
import { ProjectsStore } from "./projects-store";

export class MobxProjectPresenter implements IProjectPresenter {
  constructor(private readonly store: ProjectsStore) {}

  public presentCurrentProject(project: IProject): void {
    this.store.setCurrentProject(project);
  }

  public presentProjects(projects: IProject[]): void {
    this.store.setProjects(projects);
  }
}
