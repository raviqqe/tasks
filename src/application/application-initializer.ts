import type { AuthenticationController } from "./authentication-controller.js";
import type { AuthenticationPresenter } from "./authentication-presenter.js";

export class ApplicationInitializer {
  private readonly authenticationController: AuthenticationController;
  private readonly authenticationPresenter: AuthenticationPresenter;

  public constructor(
    authenticationController: AuthenticationController,
    authenticationPresenter: AuthenticationPresenter,
  ) {
    this.authenticationController = authenticationController;
    this.authenticationPresenter = authenticationPresenter;
  }

  public async initialize(): Promise<void> {
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
  }
}
