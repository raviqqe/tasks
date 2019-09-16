import { IProjectPresenter } from "../project-presenter";
import { ICurrentProjectRepository } from "../current-project-repository";
import { TodoTaskLister } from "../todo-task-lister";
import { IInfrastructureInitializer } from "../infrastructure-initializer";
import { IAuthenticationController } from "../authentication-controller";
import { IAuthenticationPresenter } from "../authentication-presenter";
import { IProjectRepository } from "../project-repository";
import { ProjectCreator } from "../project-creator";

export class MockManager {
  public authenticationController: jest.Mocked<IAuthenticationController> = {
    isSignedIn: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn()
  };

  public authenticationPresenter: jest.Mocked<IAuthenticationPresenter> = {
    presentSignedIn: jest.fn()
  };

  public currentProjectRepository: jest.Mocked<ICurrentProjectRepository> = {
    get: jest.fn(),
    set: jest.fn()
  };

  public infrastructureInitializer: jest.Mocked<IInfrastructureInitializer> = {
    initialize: jest.fn()
  };

  public projectCreator: jest.Mocked<ProjectCreator> = ({
    create: jest.fn()
  } as unknown) as jest.Mocked<ProjectCreator>;

  public projectPresenter: jest.Mocked<IProjectPresenter> = {
    presentArchivedProjects: jest.fn(),
    presentCurrentProject: jest.fn(),
    presentProjects: jest.fn()
  };

  public projectRepository: jest.Mocked<IProjectRepository> = {
    create: jest.fn(),
    list: jest.fn(),
    listArchived: jest.fn(),
    update: jest.fn()
  };

  public todoTaskLister: jest.Mocked<TodoTaskLister> = ({
    list: jest.fn()
  } as unknown) as jest.Mocked<TodoTaskLister>;
}
