import { atom } from "nanostores";
import type { ProjectPresenter } from "../application/project-presenter.js";
import { type Project, sortProjects } from "../domain/project.js";

export class NanostoresProjectPresenter implements ProjectPresenter {
  public readonly currentProject = atom<Project | null>(null);
  public readonly projects = atom<Project[] | null>(null);
  public readonly archivedProjects = atom<Project[] | null>(null);

  public presentCurrentProject(project: Project): void {
    this.currentProject.set(project);
  }

  public presentProjects(projects: Project[]): void {
    this.projects.set(sortProjects(projects));
  }

  public presentArchivedProjects(projects: Project[]): void {
    this.archivedProjects.set(sortProjects(projects));
  }

  public presentArchivedProject(project: Project): void {
    const projects = this.projects.get();
    const archivedProjects = this.archivedProjects.get();

    if (!projects || !archivedProjects) {
      return;
    }

    this.presentProjects(projects.filter(({ id }) => id !== project.id));
    this.presentArchivedProjects([project, ...archivedProjects]);
  }

  public presentDeletedProject(projectId: string): void {
    const archivedProjects = this.archivedProjects.get();

    if (!archivedProjects) {
      return;
    }

    this.presentArchivedProjects(
      archivedProjects.filter((project) => project.id !== projectId),
    );
  }

  public presentUnarchivedProject(project: Project): void {
    const projects = this.projects.get();
    const archivedProjects = this.archivedProjects.get();

    if (!projects || !archivedProjects) {
      return;
    }

    this.presentProjects([project, ...projects]);
    this.presentArchivedProjects(
      archivedProjects.filter(({ id }) => id !== project.id),
    );
  }

  public presentUpdatedProject(updatedProject: Project): void {
    const projects = this.projects.get();

    if (!projects) {
      return;
    } else if (this.currentProject.get()?.id === updatedProject.id) {
      this.currentProject.set(updatedProject);
    }

    this.presentProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project,
      ),
    );
  }
}
