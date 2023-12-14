import localforage from "localforage";
import { type CurrentProjectRepository } from "../application/current-project-repository.js";

const key = "currentProjectD";

export class LocalForageCurrentProjectRepository
  implements CurrentProjectRepository
{
  public async get(): Promise<string | null> {
    return localforage.getItem(key);
  }

  public async set(currentProjectD: string): Promise<void> {
    await localforage.setItem(key, currentProjectD);
  }
}
