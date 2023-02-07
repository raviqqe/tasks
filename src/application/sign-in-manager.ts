import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { CurrentProjectInitializer } from "./current-project-initializer";

export class SignInManager {
  constructor(
    private readonly currentProjectInitializer: CurrentProjectInitializer,
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async signIn(): Promise<void> {
    await this.authenticationController.signIn();

    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );

    await this.currentProjectInitializer.initialize();
  }
}
