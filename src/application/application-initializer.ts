import type { AuthenticationController } from "./authentication-controller.js";
import type { AuthenticationPresenter } from "./authentication-presenter.js";

export class ApplicationInitializer {
  readonly #authenticationController: AuthenticationController;
  readonly #authenticationPresenter: AuthenticationPresenter;

  constructor(
    authenticationController: AuthenticationController,
    authenticationPresenter: AuthenticationPresenter,
  ) {
    this.#authenticationController = authenticationController;
    this.#authenticationPresenter = authenticationPresenter;
  }

  async initialize(): Promise<void> {
    this.#authenticationPresenter.presentSignedIn(
      await this.#authenticationController.isSignedIn(),
    );
  }
}
