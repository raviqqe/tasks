import { ApplicationInitializer } from "../application/application-initializer.js";
import { authenticationController } from "./authentication-controller.js";
import { authenticationPresenter } from "./authentication-presenter.js";

export const applicationInitializer = new ApplicationInitializer(
  authenticationController,
  authenticationPresenter,
);
