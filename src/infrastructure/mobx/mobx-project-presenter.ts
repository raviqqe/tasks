import { sortProjects } from "../../domain/project";
import { IProjectPresenter } from "../../application/project-presenter";
import { IProject } from "../../domain/project";
import { ProjectsStore } from "./projects-store";

export class MobxProjectPresenter implements IProjectPresenter {
  constructor(private readonly store: ProjectsStore) {}

  public presentCurrentProject(project: IProject): void {
    this.store.setCurrentProject(project);
  }

  public presentProjects(projects: IProject[]): void {
    this.store.setProjects(sortProjects(projects));
  }

  public presentArchivedProjects(projects: IProject[]): void {
    this.store.setArchivedProjects(sortProjects(projects));
  }

  public presentArchivedProject(project: IProject): void {
    if (!this.store.projects || !this.store.archivedProjects) {
      throw new Error("projects not loaded");
    }

    this.presentProjects(
      this.store.projects.filter(({ id }) => id !== project.id)
    );
    this.presentArchivedProjects([project, ...this.store.archivedProjects]);
  }

  public presentDeletedProject(projectID: string): void {
    if (!this.store.archivedProjects) {
      throw new Error("projects not loaded");
    }

    this.presentArchivedProjects(
      this.store.archivedProjects.filter(project => project.id !== projectID)
    );
  }

  public presentUnarchivedProject(project: IProject): void {
    if (!this.store.projects || !this.store.archivedProjects) {
      throw new Error("projects not loaded");
    }

    this.presentProjects([project, ...this.store.projects]);
    this.presentArchivedProjects(
      this.store.archivedProjects.filter(({ id }) => id !== project.id)
    );
  }

  public presentUpdatedProject(updatedProject: IProject): void {
    if (!this.store.currentProject || !this.store.projects) {
      throw new Error("projects not loaded");
    } else if (this.store.currentProject.id === updatedProject.id) {
      this.store.setCurrentProject(updatedProject);
    }

    this.presentProjects(
      this.store.projects.map(project =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }
}
