import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";

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
