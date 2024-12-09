import { LocalForageCurrentProjectRepository } from "../infrastructure/local-forage-current-project-repository.js";

export const currentProjectRepository =
  new LocalForageCurrentProjectRepository();
