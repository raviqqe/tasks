import type { Project } from "../domain/project.js";
import type { CurrentProjectRepository } from "./current-project-repository.js";
import type { ProjectPresenter } from "./project-presenter.js";

export class CurrentProjectSwitcher {
  readonly #currentProjectRepository: CurrentProjectRepository;
  readonly #projectPresenter: ProjectPresenter;

  constructor(
    currentProjectRepository: CurrentProjectRepository,
    projectPresenter: ProjectPresenter,
  ) {
    this.#currentProjectRepository = currentProjectRepository;
    this.#projectPresenter = projectPresenter;
  }

  async switch(project: Project): Promise<void> {
    this.#projectPresenter.presentCurrentProject(project);
    await this.#currentProjectRepository.set(project.id);
  }
}
