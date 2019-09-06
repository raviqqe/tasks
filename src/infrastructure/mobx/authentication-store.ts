import { action, observable } from "mobx";

export class AuthenticationStore {
  @observable public signedIn: boolean | null = null;

  @action
  public setSignedIn(signedIn: boolean): void {
    this.signedIn = signedIn;
  }
}
