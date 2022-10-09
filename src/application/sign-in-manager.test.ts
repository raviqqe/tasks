import { expect, it } from "vitest";
import { SignInManager } from "./sign-in-manager";
import { MockManager } from "./test/mock-manager";

it("signs in", async () => {
  const mockManager = new MockManager();
  const signInManager = new SignInManager(mockManager.authenticationController);

  await signInManager.signIn();
  expect(mockManager.authenticationController.signIn.mock.calls).toHaveLength(
    1
  );
});
