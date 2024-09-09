import { type Project } from "../domain/project.js";

export interface ProjectPresenter {
  presentArchivedProject(project: Project): void;
  presentArchivedProjects(projects: Project[]): void;
  presentCurrentProject(project: Project): void;
  presentDeletedProject(projectId: string): void;
  presentProjects(projects: Project[]): void;
  presentUnarchivedProject(project: Project): void;
  presentUpdatedProject(project: Project): void;
}
