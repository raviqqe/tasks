import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";

export class SignOutManager {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async signOut(): Promise<void> {
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.signOut()
    );
  }
}
