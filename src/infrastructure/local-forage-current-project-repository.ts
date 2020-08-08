import localforage from "localforage";
import { ICurrentProjectRepository } from "../application/current-project-repository";

const KEY: string = "currentProjectID";

export class LocalForageCurrentProjectRepository
  implements ICurrentProjectRepository {
  public async get(): Promise<string | null> {
    return localforage.getItem(KEY);
  }

  public async set(currentProjectID: string): Promise<void> {
    await localforage.setItem(KEY, currentProjectID);
  }
}
