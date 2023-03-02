import { beforeEach, expect, it } from "vitest";
import { type IProject } from "../domain/project.js";
import { CurrentProjectInitializer } from "./current-project-initializer.js";
import { MockManager } from "./test/mock-manager.js";

const dummyProject: IProject = { archived: false, id: "", name: "" };

let mockManager: MockManager;
let currentProjectInitializer: CurrentProjectInitializer;

beforeEach(() => {
  mockManager = new MockManager();

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

  expect(mockManager.currentProjectSwitcher.switch).toHaveBeenCalledOnce();
  expect(mockManager.currentProjectSwitcher.switch).toHaveBeenCalledWith(
    dummyProject
  );
  expect(mockManager.projectPresenter.presentProjects).toHaveBeenCalledOnce();
  expect(mockManager.projectPresenter.presentProjects).toHaveBeenCalledWith([
    dummyProject,
  ]);
});

it("presents archived projects", async () => {
  await currentProjectInitializer.initialize();

  expect(
    mockManager.projectPresenter.presentArchivedProjects
  ).toHaveBeenCalledOnce();
  expect(
    mockManager.projectPresenter.presentArchivedProjects
  ).toHaveBeenCalledWith([]);
});

it("presents an initial project even if no current project ID is set", async () => {
  mockManager.currentProjectRepository.get.mockResolvedValue(null);

  await currentProjectInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch).toHaveBeenCalledOnce();
  expect(mockManager.currentProjectSwitcher.switch).toHaveBeenCalledWith(
    dummyProject
  );
  expect(mockManager.projectPresenter.presentProjects).toHaveBeenCalledOnce();
  expect(mockManager.projectPresenter.presentProjects).toHaveBeenCalledWith([
    dummyProject,
  ]);
});

it("creates a default project if none is found", async () => {
  mockManager.projectRepository.list.mockImplementationOnce(async () => []);

  await currentProjectInitializer.initialize();

  expect(mockManager.projectCreator.create).toHaveBeenCalledOnce();
  expect(mockManager.projectCreator.create).toHaveBeenCalledWith("main");
});
