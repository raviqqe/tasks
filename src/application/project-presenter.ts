import { IProject } from "../domain/project";

export interface IProjectPresenter {
  presentCurrentProject(project: IProject): void;
  presentProjects(projects: IProject[]): void;
  presentArchivedProjects(projects: IProject[]): void;
}
