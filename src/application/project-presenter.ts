import { IProject } from "../domain/project.js";

export interface IProjectPresenter {
  presentCurrentProject(project: IProject): void;
  presentProjects(projects: IProject[]): void;
  presentArchivedProjects(projects: IProject[]): void;
  presentArchivedProject(project: IProject): void;
  presentDeletedProject(projectId: string): void;
  presentUnarchivedProject(project: IProject): void;
  presentUpdatedProject(project: IProject): void;
}
