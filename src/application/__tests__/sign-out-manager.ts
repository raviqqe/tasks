import { IAuthenticationController } from "../authentication-controller";
import { SignOutManager } from "../sign-out-manager";

it("signs out", async () => {
  const authenticationController = {
    signOut: jest.fn(async () => false)
  };
  const authenticationPresenter = { presentSignedIn: jest.fn() };
  const signOutManager = new SignOutManager(
    (authenticationController as unknown) as IAuthenticationController,
    authenticationPresenter
  );

  await signOutManager.signOut();

  expect(authenticationController.signOut).toBeCalledTimes(1);
  expect(authenticationPresenter.presentSignedIn.mock.calls).toEqual([[false]]);
});
