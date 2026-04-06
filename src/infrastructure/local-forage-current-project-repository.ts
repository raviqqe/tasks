import localforage from "localforage";
import type { CurrentProjectRepository } from "../application/current-project-repository.js";

const key = "currentProjectId";

export class LocalForageCurrentProjectRepository
  implements CurrentProjectRepository
{
  async get(): Promise<string | null> {
    return localforage.getItem(key);
  }

  async set(currentProjectId: string): Promise<void> {
    await localforage.setItem(key, currentProjectId);
  }
}
