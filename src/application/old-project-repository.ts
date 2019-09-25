import { IOldProject } from "../domain/old-project";

export interface IOldProjectRepository {
  markMigrated(name: string): Promise<void>;
  list(): Promise<IOldProject[]>;
}
