import { type AuthenticationPresenter } from "../application/authentication-presenter.js";
import { type Renderer } from "./renderer.js";

export class AuthenticationPresenter implements AuthenticationPresenter {
  private renderer: Renderer | null = null;

  public setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }

  public presentSignedIn(signedIn: boolean): void {
    this.renderer?.renderSignedIn(signedIn);
  }
}
