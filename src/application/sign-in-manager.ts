import { IAuthenticationController } from "./authentication-controller.js";
import { IAuthenticationPresenter } from "./authentication-presenter.js";

export class SignInManager {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async signIn(): Promise<void> {
    await this.authenticationController.signIn();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );
  }
}
