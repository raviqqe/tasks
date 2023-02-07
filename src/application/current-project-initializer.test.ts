import { beforeEach, expect, it } from "vitest";
import { IProject } from "../domain/project";
import { CurrentProjectInitializer } from "./current-project-initializer";
import { MockManager } from "./test/mock-manager";

const dummyProject: IProject = { archived: false, id: "", name: "" };

let mockManager: MockManager;
let currentProjectInitializer: CurrentProjectInitializer;

beforeEach(() => {
  mockManager = new MockManager();
  mockManager.authenticationController.isSignedIn.mockResolvedValue(true);
  mockManager.currentProjectRepository.get.mockResolvedValue(dummyProject.id);
  mockManager.projectRepository.list.mockResolvedValue([dummyProject]);
  mockManager.projectRepository.listArchived.mockResolvedValue([]);
  currentProjectInitializer = new CurrentProjectInitializer(
    mockManager.projectCreator,
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.currentProjectSwitcher,
    mockManager.currentProjectRepository
  );
});

it("presents an initial project", async () => {
  await currentProjectInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [dummyProject],
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[dummyProject]],
  ]);
});

it("presents archived projects", async () => {
  await currentProjectInitializer.initialize();

  expect(
    mockManager.projectPresenter.presentArchivedProjects.mock.calls
  ).toEqual([[[]]]);
});

it("presents an initial project even if no current project ID is set", async () => {
  mockManager.currentProjectRepository.get.mockResolvedValue(null);

  await currentProjectInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [dummyProject],
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[dummyProject]],
  ]);
});

it("creates a default project if none is found", async () => {
  mockManager.projectRepository.list.mockImplementationOnce(async () => []);

  await currentProjectInitializer.initialize();

  expect(mockManager.projectCreator.create.mock.calls).toEqual([["main"]]);
});
