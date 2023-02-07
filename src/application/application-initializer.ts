import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { CurrentProjectInitializer } from "./current-project-initializer";

export class ApplicationInitializer {
  constructor(
    private readonly currentProjectInitializer: CurrentProjectInitializer,
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter
  ) {}

  public async initialize(): Promise<void> {
    const signedIn = await this.authenticationController.isSignedIn();
    this.authenticationPresenter.presentSignedIn(signedIn);

    if (!signedIn) {
      return;
    }

    await this.currentProjectInitializer.initialize();
  }
}
