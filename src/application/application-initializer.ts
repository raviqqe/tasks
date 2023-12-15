import { type AuthenticationController } from "./authentication-controller.js";
import { type AuthenticationPresenter } from "./authentication-presenter.js";

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: AuthenticationController,
    private readonly authenticationPresenter: AuthenticationPresenter,
  ) {}

  public async initialize(): Promise<void> {
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn(),
    );
  }
}
