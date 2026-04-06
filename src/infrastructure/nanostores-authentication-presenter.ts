import { atom } from "nanostores";
import type { AuthenticationPresenter } from "../application/authentication-presenter.js";

export class NanostoresAuthenticationPresenter
  implements AuthenticationPresenter
{
  readonly signedIn = atom<boolean | null>(null);

  presentSignedIn(signedIn: boolean): void {
    this.signedIn.set(signedIn);
  }
}
