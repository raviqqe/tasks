import { type IAuthenticationController } from "./authentication-controller.js";
import { type IAuthenticationPresenter } from "./authentication-presenter.js";

export class SignOutManager {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async signOut(): Promise<void> {
    await this.authenticationController.signOut();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );
  }
}
