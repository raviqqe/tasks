import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { type Renderer } from "./renderer.js";

export class NanostoresAuthenticationPresenter
  implements AuthenticationPresenter
{
  public readonly signedIn = atom<boolean | null>(null);

  public presentSignedIn(signedIn: boolean): void {
    this.renderer?.renderSignedIn(signedIn);
  }
}
