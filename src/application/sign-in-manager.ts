import { IAuthenticationController } from "./authentication-controller";

export class SignInManager {
  constructor(
    private readonly authenticationController: IAuthenticationController
  ) {}

  public async signIn(): Promise<void> {
    await this.authenticationController.signIn();
  }
}
