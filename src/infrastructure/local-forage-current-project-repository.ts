import localforage from "localforage";
import { type ICurrentProjectRepository } from "../application/current-project-repository.js";

const key = "currentProjectID";

export class LocalForageCurrentProjectRepository
  implements ICurrentProjectRepository
{
  public async get(): Promise<string | null> {
    return localforage.getItem(key);
  }

  public async set(currentProjectID: string): Promise<void> {
    await localforage.setItem(key, currentProjectID);
  }
}
