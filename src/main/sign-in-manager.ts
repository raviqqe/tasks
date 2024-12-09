import { SignInManager } from "../application/sign-in-manager.js";
import { authenticationController } from "./authentication-controller.js";
import { authenticationPresenter } from "./authentication-presenter.js";

export const signInManager = new SignInManager(
  authenticationController,
  authenticationPresenter,
);
