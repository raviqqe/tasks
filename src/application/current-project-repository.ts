// Local in applications
export interface ICurrentProjectRepository {
  set(projectID: string): Promise<void>;
  get(): Promise<string | null>;
}
