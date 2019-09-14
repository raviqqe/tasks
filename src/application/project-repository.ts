import { IProject } from "../domain/project";

export interface IProjectRepository {
  create(project: IProject): Promise<void>;
  list(): Promise<IProject[]>;
  update(project: IProject): Promise<void>;
}
