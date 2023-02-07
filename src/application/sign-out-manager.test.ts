import { expect, it } from "vitest";
import { SignOutManager } from "./sign-out-manager";
import { MockManager } from "./test/mock-manager";

it("signs out", async () => {
  const mockManager = new MockManager();
  const signOutManager = new SignOutManager(
    mockManager.authenticationController,
    mockManager.authenticationPresenter
  );

  await signOutManager.signOut();

  expect(mockManager.authenticationController.signOut).toHaveBeenCalledOnce();
  expect(
    mockManager.authenticationPresenter.presentSignedIn
  ).toHaveBeenCalledWith(false);
});
