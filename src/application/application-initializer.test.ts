import { beforeEach, expect, it } from "vitest";
import { IProject } from "../domain/project";
import { ApplicationInitializer } from "./application-initializer";
import { MockManager } from "./test/mock-manager";

const dummyProject: IProject = { archived: false, id: "", name: "" };

let mockManager: MockManager;
let applicationInitializer: ApplicationInitializer;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.authenticationController.isSignedIn.mockResolvedValue(true);
  mockManager.currentProjectRepository.get.mockResolvedValue(dummyProject.id);
  mockManager.projectRepository.list.mockResolvedValue([dummyProject]);
  mockManager.projectRepository.listArchived.mockResolvedValue([]);
  applicationInitializer = new ApplicationInitializer(
    mockManager.currentProjectInitializer,
    mockManager.authenticationController,
    mockManager.authenticationPresenter
  );
});

it("presents sign-in state", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.authenticationPresenter.presentSignedIn.mock.calls
  ).toEqual([[true]]);
});

it("presents an initial project", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.currentProjectInitializer.initialize
  ).toHaveBeenCalledOnce();
});

it("does not present any project if a user is not signed in", async () => {
  mockManager.authenticationController.isSignedIn.mockResolvedValue(false);

  await applicationInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch).not.toHaveBeenCalled();
  expect(mockManager.projectPresenter.presentProjects).not.toHaveBeenCalled();
});
