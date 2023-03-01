import { IAuthenticationPresenter } from "../application/authentication-presenter.js";
import { IRenderer } from "./renderer.js";

export class AuthenticationPresenter implements IAuthenticationPresenter {
  private renderer: IRenderer | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentSignedIn(signedIn: boolean): void {
    this.renderer?.renderSignedIn(signedIn);
  }
}
