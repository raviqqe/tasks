import { SignOutManager } from "../application/sign-out-manager.js";
import { authenticationController } from "./authentication-controller.js";
import { authenticationPresenter } from "./authentication-presenter.js";

export const signOutManager = new SignOutManager(
  authenticationController,
  authenticationPresenter,
);
