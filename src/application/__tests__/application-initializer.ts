import { IProject } from "../../domain/project";
import { ApplicationInitializer } from "../application-initializer";
import { MockManager } from "../test/mock-manager";

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
    mockManager.authenticationController,
    mockManager.authenticationPresenter,
    mockManager.infrastructureInitializer,
    mockManager.projectCreator,
    mockManager.projectRepository,
    mockManager.projectPresenter,
    mockManager.currentProjectSwitcher,
    mockManager.currentProjectRepository
  );
});

it("initializes infrastructure", async () => {
  await applicationInitializer.initialize();

  expect(mockManager.infrastructureInitializer.initialize).toBeCalledTimes(1);
});

it("presents sign-in state", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.authenticationPresenter.presentSignedIn.mock.calls
  ).toEqual([[true]]);
});

it("presents an initial project", async () => {
  await applicationInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [dummyProject],
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[dummyProject]],
  ]);
});

it("presents archived projects", async () => {
  await applicationInitializer.initialize();

  expect(
    mockManager.projectPresenter.presentArchivedProjects.mock.calls
  ).toEqual([[[]]]);
});

it("presents an initial project even if no current project ID is set", async () => {
  mockManager.currentProjectRepository.get.mockResolvedValue(null);

  await applicationInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch.mock.calls).toEqual([
    [dummyProject],
  ]);
  expect(mockManager.projectPresenter.presentProjects.mock.calls).toEqual([
    [[dummyProject]],
  ]);
});

it("creates a default project if none is found", async () => {
  mockManager.projectRepository.list.mockImplementationOnce(() =>
    Promise.resolve([])
  );

  await applicationInitializer.initialize();

  expect(mockManager.projectCreator.create.mock.calls).toEqual([["main"]]);
});

it("does not present any project if a user is not signed in", async () => {
  mockManager.authenticationController.isSignedIn.mockResolvedValue(false);

  await applicationInitializer.initialize();

  expect(mockManager.currentProjectSwitcher.switch).not.toBeCalled();
  expect(mockManager.projectPresenter.presentProjects).not.toBeCalled();
});
