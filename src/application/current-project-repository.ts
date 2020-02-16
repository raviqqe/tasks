// Local in applications
export interface ICurrentProjectRepository {
  set(projectId: string): Promise<void>;
  get(): Promise<string | null>;
}
