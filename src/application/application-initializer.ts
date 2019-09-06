import { IAuthenticationController } from "./authentication-controller";
import { IAuthenticationPresenter } from "./authentication-presenter";
import { IInfrastructureInitializer } from "./infrastructure-initializer";

export class ApplicationInitializer {
  constructor(
    private readonly authenticationController: IAuthenticationController,
    private readonly authenticationPresenter: IAuthenticationPresenter,
    private readonly infrastructureInitializer: IInfrastructureInitializer
  ) {}

  public async initialize(): Promise<void> {
    await this.infrastructureInitializer.initialize();
    this.authenticationPresenter.presentSignedIn(
      await this.authenticationController.isSignedIn()
    );
  }
}
