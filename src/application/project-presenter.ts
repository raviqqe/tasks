import { type Project } from "../domain/project.js";

export interface ProjectPresenter {
  presentCurrentProject(project: Project): void;
  presentProjects(projects: Project[]): void;
  presentArchivedProjects(projects: Project[]): void;
  presentArchivedProject(project: Project): void;
  presentDeletedProject(projectId: string): void;
  presentUnarchivedProject(project: Project): void;
  presentUpdatedProject(project: Project): void;
}
