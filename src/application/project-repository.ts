import type { Project } from "../domain/project.js";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  delete(projectId: string): Promise<void>;
  list(): Promise<Project[]>;
  listArchived(): Promise<Project[]>;
  update(project: Project): Promise<void>;
}
