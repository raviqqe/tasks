import { type AuthenticationController } from "./authentication-controller.js";
import { type AuthenticationPresenter } from "./authentication-presenter.js";

export class SignInManager {
  constructor(
    private readonly authenticationController: AuthenticationController,
    private readonly authenticationPresenter: AuthenticationPresenter,
  ) {}

  public async signIn(): Promise<void> {
    await this.authenticationController.signIn();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
  }
}
