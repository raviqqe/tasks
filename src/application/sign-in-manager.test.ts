import { expect, it } from "vitest";
import { SignInManager } from "./sign-in-manager";
import { MockManager } from "./test/mock-manager";

it("signs in", async () => {
  const mockManager = new MockManager();
  const signInManager = new SignInManager(
    mockManager.authenticationController,
    mockManager.authenticationPresenter
  );

  await signInManager.signIn();

  expect(mockManager.authenticationController.signIn).toHaveBeenCalledOnce();
  expect(
    mockManager.authenticationPresenter.presentSignedIn
  ).toHaveBeenCalledOnce();
});
