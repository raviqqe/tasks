import { IAuthenticationPresenter } from "../../application/authentication-presenter";
import { AuthenticationStore } from "./authentication-store";

export class MobxAuthenticationPresenter implements IAuthenticationPresenter {
  constructor(private readonly store: AuthenticationStore) {}

  public presentSignedIn(signedIn: boolean): void {
    this.store.setSignedIn(signedIn);
  }
}
