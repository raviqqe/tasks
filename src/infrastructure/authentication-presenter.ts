import { IAuthenticationPresenter } from "../application/authentication-presenter";
import { IRenderer } from "./renderer";

export class AuthenticationPresenter implements IAuthenticationPresenter {
  private renderer: IRenderer | null = null;

  public setRenderer(renderer: IRenderer): void {
    this.renderer = renderer;
  }

  public presentSignedIn(signedIn: boolean): void {
    this.renderer?.renderSignedIn(signedIn);
  }
}
