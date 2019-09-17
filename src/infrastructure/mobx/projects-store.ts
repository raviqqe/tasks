import { action, observable } from "mobx";
import { IProject } from "../../domain/project";

export class ProjectsStore {
  @observable public currentProject: IProject | null = null;
  @observable public projects: IProject[] | null = null;
  @observable public archivedProjects: IProject[] | null = null;

  @action
  public setCurrentProject(project: IProject): void {
    this.currentProject = project;
  }

  @action
  public setProjects(projects: IProject[]): void {
    this.projects = projects;
  }

  @action
  public setArchivedProjects(projects: IProject[]): void {
    this.archivedProjects = projects;
  }
}
