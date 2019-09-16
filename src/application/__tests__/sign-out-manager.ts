import { SignOutManager } from "../sign-out-manager";
import { MockManager } from "../test/mock-manager";

it("signs out", async () => {
  const mockManager = new MockManager();
  mockManager.authenticationController.signOut.mockResolvedValue(false);
  const signOutManager = new SignOutManager(
    mockManager.authenticationController,
    mockManager.authenticationPresenter
  );

  await signOutManager.signOut();

  expect(mockManager.authenticationController.signOut).toBeCalledTimes(1);
  expect(
    mockManager.authenticationPresenter.presentSignedIn.mock.calls
  ).toEqual([[false]]);
});
