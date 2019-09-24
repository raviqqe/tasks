import { IProject } from "../domain/project";

export interface IProjectRepository {
  create(project: IProject): Promise<void>;
  delete(projectID: string): Promise<void>;
  list(): Promise<IProject[]>;
  listArchived(): Promise<IProject[]>;
  update(project: IProject): Promise<void>;
}
