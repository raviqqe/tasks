// Local in applications
export interface CurrentProjectRepository {
  get(): Promise<string | null>;
  set(projectId: string): Promise<void>;
}
