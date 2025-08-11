import type { AuthenticationController } from "./authentication-controller.js";
import type { AuthenticationPresenter } from "./authentication-presenter.js";

export class SignOutManager {
  private readonly authenticationController: AuthenticationController;
  private readonly authenticationPresenter: AuthenticationPresenter;

  public constructor(
    authenticationController: AuthenticationController,
    authenticationPresenter: AuthenticationPresenter,
  ) {
    this.authenticationController = authenticationController;
    this.authenticationPresenter = authenticationPresenter;
  }

  public async signOut(): Promise<void> {
    await this.authenticationController.signOut();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
  }
}
