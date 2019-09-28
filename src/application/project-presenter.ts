import { IProject } from "../domain/project";

export interface IProjectPresenter {
  presentCurrentProject(project: IProject): void;
  presentProjects(projects: IProject[]): void;
  presentArchivedProjects(projects: IProject[]): void;
  presentArchivedProject(project: IProject): void;
  presentDeletedProject(projectID: string): void;
  presentUnarchivedProject(project: IProject): void;
  presentUpdatedProject(project: IProject): void;
}
