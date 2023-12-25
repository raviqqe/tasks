// Local in applications
export interface CurrentProjectRepository {
  set(projectId: string): Promise<void>;
  get(): Promise<string | null>;
}
