import { IProject } from "../../domain/project";
import { ApplicationInitializer } from "../application-initializer";
import { IAuthenticationController } from "../authentication-controller";
import { IAuthenticationPresenter } from "../authentication-presenter";
import { IProjectRepository } from "../project-repository";
import { IProjectPresenter } from "../project-presenter";
import { ProjectCreator } from "../project-creator";
import { IInfrastructureInitializer } from "../infrastructure-initializer";

const dummyProject: IProject = { id: "", name: "" };

let infrastructureInitializer: jest.Mocked<IInfrastructureInitializer>;
let authenticationController: jest.Mocked<IAuthenticationController>;
let authenticationPresenter: jest.Mocked<IAuthenticationPresenter>;
let projectRepository: jest.Mocked<IProjectRepository>;
let projectPresenter: jest.Mocked<IProjectPresenter>;
let projectCreator: jest.Mocked<ProjectCreator>;
let applicationInitializer: ApplicationInitializer;

beforeEach(() => {
  infrastructureInitializer = { initialize: jest.fn() };
  authenticationController = ({
    isSignedIn: jest.fn(async () => true)
  } as unknown) as jest.Mocked<IAuthenticationController>;
  authenticationPresenter = { presentSignedIn: jest.fn() };
  projectRepository = {
    create: jest.fn(),
    list: jest.fn(async () => [dummyProject]),
    update: jest.fn()
  };
  projectPresenter = {
    presentCurrentProject: jest.fn(),
    presentProjects: jest.fn()
  };
  projectCreator = ({ create: jest.fn() } as unknown) as jest.Mocked<
    ProjectCreator
  >;

  applicationInitializer = new ApplicationInitializer(
    authenticationController,
    authenticationPresenter,
    infrastructureInitializer,
    projectCreator,
    projectRepository,
    projectPresenter
  );
});

it("initializes infrastructure", async () => {
  await applicationInitializer.initialize();

  expect(infrastructureInitializer.initialize).toBeCalledTimes(1);
});

it("presents sign-in state", async () => {
  await applicationInitializer.initialize();

  expect(authenticationPresenter.presentSignedIn.mock.calls).toEqual([[true]]);
});

it("presents an initial project", async () => {
  await applicationInitializer.initialize();

  expect(projectPresenter.presentCurrentProject.mock.calls).toEqual([
    [dummyProject]
  ]);
  expect(projectPresenter.presentProjects.mock.calls).toEqual([
    [[dummyProject]]
  ]);
});

it("creates a default project if none is found", async () => {
  projectRepository.list.mockImplementationOnce(async () => []);

  await applicationInitializer.initialize();

  const defaultProject = {
    id: expect.any(String),
    name: "default"
  };

  expect(projectRepository.create.mock.calls).toEqual([[defaultProject]]);
  expect(projectPresenter.presentCurrentProject.mock.calls).toEqual([
    [defaultProject]
  ]);
  expect(projectPresenter.presentProjects).toBeCalledTimes(1);
});

it("does not present any project if a user is not signed in", async () => {
  authenticationController.isSignedIn.mockResolvedValue(false);

  await applicationInitializer.initialize();

  expect(projectPresenter.presentCurrentProject).toBeCalledTimes(0);
  expect(projectPresenter.presentProjects).toBeCalledTimes(0);
});
