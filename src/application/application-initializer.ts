import { IAuthenticationController } from "./authentication-controller.js";
import { IAuthenticationPresenter } from "./authentication-presenter.js";

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async initialize(): Promise<void> {
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );
  }
}
