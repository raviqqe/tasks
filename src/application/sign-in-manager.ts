import type { AuthenticationController } from "./authentication-controller.js";
import type { AuthenticationPresenter } from "./authentication-presenter.js";

export class SignInManager {
  readonly #authenticationController: AuthenticationController;
  readonly #authenticationPresenter: AuthenticationPresenter;

  constructor(
    authenticationController: AuthenticationController,
    authenticationPresenter: AuthenticationPresenter,
  ) {
    this.#authenticationController = authenticationController;
    this.#authenticationPresenter = authenticationPresenter;
  }

  async signIn(): Promise<void> {
    await this.#authenticationController.signIn();

    this.#authenticationPresenter.presentSignedIn(
      await this.#authenticationController.isSignedIn(),
    );
  }
}
